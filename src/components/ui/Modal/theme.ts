import { type ModalTheme } from "@karya_app1/rain-js";

const theme: Partial<ModalTheme> = {
  colors: {
    overlay: "rgba(2, 6, 23, 0.7)",
    surface: "var(--secondary-main)",
    headerBg: "var(--secondary-main)",
    headerText: "var(--primary-main)",
    bodyText: "var(--primary-main)",
    footerBg: "var(--secondary-main)",
    footerText: "var(--secondary-main)",
    border: "var(--secondary-main)",
    shadow: "var(--primary-main-shadow)",
  },
  borderRadius: "12px",
  borderWidth: "1px",
  fontFamily: "Inter, system-ui, sans-serif",
  padding: { header: "12px 16px", body: "20px", footer: "12px 16px" },
  width: "640px",
  height: "auto"
};

export default theme;