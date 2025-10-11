import { useResponsive, type ToastTheme } from "@karya_app1/rain-js";
import theme from "../ui/Button/theme";

const useToastTheme = () => {
  const { isMobile } = useResponsive();
  const theme: ToastTheme = {
  container: {
    zIndex: 1000,
    gap: 8,
    edgeOffset: 16,
    mobileBreakpoint: 90,
    placement: isMobile ? "bottom-center": "top-right",
  },
  toast: {
    borderRadius: isMobile ? "8px 8px 0 0" : "8px 0 0 8px",
    shadow: "0 8px 20px rgba(0,0,0,0.15)",
    padding: "10px 12px",
    width: isMobile ? "calc( 100% - 32px )" : "calc( 100vw /2)",
    maxWidth: "100%",
    fontSize: "14px",
  },
  variants: {
    success: { background: "#16a34a", color: "#fff" },
    error: { background: "var(--primary-main-error)", color: "var(--primary-main)" },
    info: { background: "#2563eb", color: "#fff" },
    warning: { background: "#f59e0b", color: "#111827" },
  },
  durations: { default: 3},
}
return {theme}
}
export default useToastTheme;