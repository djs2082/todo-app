import { type ModalTheme } from "@karya_app1/rain-js";

const theme: Partial<ModalTheme> = {
  colors: {
    overlay: "rgba(2, 6, 23, 0.7)",
    surface: "#0b1220",
    headerBg: "#0f172a",
    headerText: "#e5e7eb",
    bodyText: "#e5e7eb",
    footerBg: "#0f172a",
    footerText: "#e5e7eb",
    border: "#334155",
    shadow: "rgba(0,0,0,0.5)"
  },
  borderRadius: "12px",
  borderWidth: "1px",
  fontFamily: "Inter, system-ui, sans-serif",
  padding: { header: "12px 16px", body: "20px", footer: "12px 16px" },
  width: "640px",
  height: "auto"
};

export default theme;