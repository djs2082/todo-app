import { type InputTheme } from "@karya_app1/rain-js";

// Light (white mode) theme using CSS variables
export const lightTheme: Partial<InputTheme> = {
  colors: {
    primary: {
      main: "var(--input-primary-main)",
      hover: "var(--input-primary-hover)",
      text: "var(--input-primary-text)",
      border: "var(--input-primary-border)",
      focus: "var(--input-primary-focus)",
      helper: "var(--input-primary-helper)",
    },
    secondary: {
      main: "var(--input-secondary-main)",
      hover: "var(--input-secondary-hover)",
      text: "var(--input-secondary-text)",
      border: "var(--input-secondary-border)",
      focus: "var(--input-secondary-focus)",
      helper: "var(--input-secondary-helper)",
    },
    error: {
      main: "var(--input-error-main)",
      hover: "var(--input-error-hover)",
      text: "var(--input-error-text)",
      border: "var(--input-error-border)",
      focus: "var(--input-error-focus)",
      helper: "var(--input-error-helper)",
    },
    success: {
      main: "var(--input-success-main)",
      hover: "var(--input-success-hover)",
      text: "var(--input-success-text)",
      border: "var(--input-success-border)",
      focus: "var(--input-success-focus)",
      helper: "var(--input-success-helper)",
    },
    warning: {
      main: "var(--input-warning-main)",
      hover: "var(--input-warning-hover)",
      text: "var(--input-warning-text)",
      border: "var(--input-warning-border)",
      focus: "var(--input-warning-focus)",
      helper: "var(--input-warning-helper)",
    },
    info: {
      main: "var(--input-info-main)",
      hover: "var(--input-info-hover)",
      text: "var(--input-info-text)",
      border: "var(--input-info-border)",
      focus: "var(--input-info-focus)",
      helper: "var(--input-info-helper)",
    },
  },
  sizes: {
    small: { padding: "6px 10px", fontSize: "0.85rem", height: "32px", labelFontSize: "0.75rem" },
    medium: { padding: "10px 14px", fontSize: "0.95rem", height: "44px", labelFontSize: "0.9rem" },
    large: { padding: "14px 18px", fontSize: "1.05rem", height: "52px", labelFontSize: "1rem" },
  },
  borderRadius: "var(--input-border-radius)",
  fontFamily: "var(--input-font-family)",
  labelColor: "var(--input-label-color)",
  placeholderColor: "var(--input-placeholder-color)",
  background: "var(--input-background)",
  borderWidth: "var(--input-border-width)",
  labelBackground: "var(--input-label-background)",
};

// Dark theme object kept for explicit switching if needed.
// It uses the same CSS variable keys, which resolve differently under [data-theme="dark"].
export const darkTheme: Partial<InputTheme> = { ...lightTheme };

export default lightTheme;
