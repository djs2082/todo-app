import { PageLayoutTheme } from '@karya_app1/rain-js';

const theme: PageLayoutTheme = {
  surface: {
    background: "var(--secondary-main)",
  },
  header: {
    defaultHeight: "60px",
    background: "var(--header-bg)",
    color: "#111827",
    borderBottom: "1px solid var(--header-bg)",
    zIndex: 100,
  },
  footer: {
    defaultHeight: "60px",
    background: "#ffffff",
    color: "#111827",
    borderTop: "1px solid #e5e7eb",
    zIndex: 100,
  },
  content: {
    padding: "16px",
    background: "var(--secondary-main)",
  },
};
export default theme;