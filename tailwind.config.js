import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed": "#002113",
        "on-primary-fixed-variant": "#454747",
        "on-primary": "#2f3131",
        "on-primary-fixed": "#1a1c1c",
        "on-background": "#e2e2e8",
        "secondary-fixed-dim": "#adc6ff",
        "on-error-container": "#ffdad6",
        "on-primary-container": "#636565",
        "surface-container-lowest": "#0c0e12",
        "on-secondary-fixed": "#001a42",
        "on-surface-variant": "#c4c7c8",
        "surface-container-highest": "#333539",
        "on-secondary": "#002e6a",
        "surface-container": "#1e2024",
        "on-tertiary": "#003824",
        "background": "#111317",
        "primary-container": "#e2e2e2",
        "on-secondary-container": "#e6ecff",
        "on-tertiary-container": "#00734e",
        "inverse-surface": "#e2e2e8",
        "primary": "#ffffff",
        "inverse-primary": "#5d5f5f",
        "secondary-container": "#0566d9",
        "surface-container-low": "#1a1c20",
        "surface-dim": "#111317",
        "on-surface": "#e2e2e8",
        "tertiary-fixed": "#6ffbbe",
        "error-container": "#93000a",
        "surface-tint": "#c6c6c7",
        "surface-bright": "#37393e",
        "surface-container-high": "#282a2e",
        "on-secondary-fixed-variant": "#004395",
        "tertiary-container": "#6ffbbe",
        "on-error": "#690005",
        "surface-variant": "#333539",
        "error": "#ffb4ab",
        "on-tertiary-fixed-variant": "#005236",
        "secondary": "#adc6ff",
        "inverse-on-surface": "#2f3035",
        "tertiary": "#ffffff",
        "tertiary-fixed-dim": "#4edea3",
        "primary-fixed": "#e2e2e2",
        "outline": "#8e9192",
        "secondary-fixed": "#d8e2ff",
        "primary-fixed-dim": "#c6c6c7",
        "outline-variant": "#444748",
        "surface": "#111317"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "stack-gap": "4rem",
        "margin-desktop": "2.5rem",
        "gutter": "1.5rem",
        "margin-mobile": "1rem",
        "container-max": "1200px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "label-md": ["JetBrains Mono", "sans-serif"],
        "headline-md": ["Hanken Grotesk", "sans-serif"],
        "headline-lg": ["Hanken Grotesk", "sans-serif"],
        "headline-sm": ["Hanken Grotesk", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Hanken Grotesk", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "label-md": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
        "headline-lg": ["40px", {"lineHeight": "48px", "fontWeight": "700"}],
        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "headline-lg-mobile": ["30px", {"lineHeight": "38px", "fontWeight": "700"}]
      }
    },
  },
  plugins: [
    forms,
    containerQueries,
  ],
}
