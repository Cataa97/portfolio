document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation Scroll Effect ---
  const nav = document.querySelector('nav');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('bg-background/95', 'shadow-lg', 'border-white/10');
      nav.classList.remove('bg-background/80');
    } else {
      nav.classList.remove('bg-background/95', 'shadow-lg', 'border-white/10');
      nav.classList.add('bg-background/80');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = menuBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
      }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // --- Active Nav Highlighting & Smooth Scroll ---
  const sections = document.querySelectorAll('section, header.hero-section');
  const navLinks = document.querySelectorAll('nav .nav-link-desktop');
  const mobileNavLinks = document.querySelectorAll('#mobile-menu .nav-link-mobile');

  const updateActiveLink = (id) => {
    // Reset all
    navLinks.forEach(link => {
      link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-secondary-container', 'pb-1');
      link.classList.add('text-on-surface-variant');
    });
    mobileNavLinks.forEach(link => {
      link.classList.remove('text-primary', 'font-bold', 'bg-surface-container');
      link.classList.add('text-on-surface-variant');
    });

    // Set active
    const activeDesktop = document.querySelector(`nav a[href="#${id}"]`);
    if (activeDesktop) {
      activeDesktop.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-secondary-container', 'pb-1');
      activeDesktop.classList.remove('text-on-surface-variant');
    }

    const activeMobile = document.querySelector(`#mobile-menu a[href="#${id}"]`);
    if (activeMobile) {
      activeMobile.classList.add('text-primary', 'font-bold', 'bg-surface-container');
      activeMobile.classList.remove('text-on-surface-variant');
    }
  };

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section is in viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) updateActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // --- Scroll Reveal Animations ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Anim only once
      }
    });
  }, {
    root: null,
    threshold: 0.1
  });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Form Contact Validation & Web3Forms Submit ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      // Simple frontend validation
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Por favor completa los campos requeridos (Nombre, Correo y Mensaje).');
        return;
      }

      const originalText = btn.innerHTML;
      btn.innerHTML = `Enviando... <span class="material-symbols-outlined animate-spin text-xl ml-2">sync</span>`;
      btn.disabled = true;
      btn.classList.add('opacity-70');

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData));

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        let result = await response.json();
        if (response.status === 200) {
          btn.innerHTML = `¡Mensaje Enviado! <span class="material-symbols-outlined text-xl ml-2">check_circle</span>`;
          btn.classList.remove('bg-primary', 'text-on-primary');
          btn.classList.add('bg-on-tertiary-container', 'text-white');
          form.reset();
        } else {
          console.error(response);
          btn.innerHTML = `Error al enviar <span class="material-symbols-outlined text-xl ml-2">error</span>`;
          alert('Hubo un error al enviar el mensaje: ' + (result.message || 'Error desconocido'));
        }
      })
      .catch(error => {
        console.error(error);
        btn.innerHTML = `Error al enviar <span class="material-symbols-outlined text-xl ml-2">error</span>`;
        alert('Hubo un error de conexión al enviar el mensaje.');
      })
      .then(() => {
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-on-tertiary-container', 'text-white', 'opacity-70');
          btn.classList.add('bg-primary', 'text-on-primary');
          btn.disabled = false;
        }, 3000);
      });
    });
  }

  // --- Certificate Modal Viewer ---
  const setupCertificatesModal = () => {
    // Add modal to body if not already present
    let modal = document.getElementById('cert-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.setAttribute('id', 'cert-modal');
      modal.className = 'fixed inset-0 z-[100] hidden items-center justify-center bg-background/90 backdrop-blur-md p-4 transition-opacity duration-300';
      modal.innerHTML = `
        <div class="relative max-w-4xl w-full bg-surface-container border border-white/10 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <button id="close-modal-btn" class="absolute top-4 right-4 bg-background/80 hover:bg-surface-container-high border border-white/10 text-primary w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 active:scale-95">
            <span class="material-symbols-outlined">close</span>
          </button>
          <div class="p-6 overflow-y-auto flex flex-col items-center">
            <h3 id="modal-cert-title" class="font-headline-md text-headline-md text-primary mb-4 text-center"></h3>
            <div class="w-full flex justify-center bg-black/30 rounded-xl overflow-hidden mb-4 p-2 border border-white/5">
              <img id="modal-cert-img" class="max-h-[60vh] object-contain w-auto rounded-lg shadow-lg" src="" alt="" />
            </div>
            <p id="modal-cert-desc" class="font-body-md text-body-md text-on-surface-variant text-center max-w-2xl"></p>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const modalTitle = modal.querySelector('#modal-cert-title');
    const modalImg = modal.querySelector('#modal-cert-img');
    const modalDesc = modal.querySelector('#modal-cert-desc');
    const closeBtn = modal.querySelector('#close-modal-btn');

    const openModal = (title, imgSrc, desc) => {
      modalTitle.textContent = title;
      modalImg.src = imgSrc;
      modalImg.alt = title;
      modalDesc.textContent = desc || "Certificado oficial";
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    };

    // Close button event
    closeBtn.addEventListener('click', closeModal);

    // Click outside modal content closes it
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });

    // Bind event listeners to certificate cards "Ver certificado"
    document.querySelectorAll('#certificados .glass-card').forEach(card => {
      const button = card.querySelector('button');
      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const title = card.querySelector('h3').textContent;
          // Check for a custom certificate image on the button, otherwise use the preview img src
          const img = button.getAttribute('data-cert') || card.querySelector('img').src;
          const badge = card.querySelector('.inline-block').textContent;
          openModal(title, img, badge);
        });
      }
    });

    // Also support any element with data-cert attribute outside of #certificados
    document.querySelectorAll('[data-cert]').forEach(btn => {
      if (btn.closest('#certificados')) return; // Avoid double binding
      
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = btn.getAttribute('data-title') || "Certificado";
        const img = btn.getAttribute('data-cert');
        const badge = btn.getAttribute('data-badge') || "Certificación oficial";
        openModal(title, img, badge);
      });
    });
  };

  setupCertificatesModal();
});
