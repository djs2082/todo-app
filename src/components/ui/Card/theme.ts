import { type CardTheme } from '@karya_app1/rain-js';

const theme: CardTheme = {
  container: {
    background: "var(--secondary-main)",
    color: "var(--primary-main)",
    border: "1px solid var(--secondary-main)",
    borderRadius: "12px",
    shadow: "0 6px 16px var(--primary-main-shadow)",
    padding: "16px",
    gap: 12,
    width: "auto",
    maxWidth: 640,
    height: undefined,
    mobileBreakpoint: 640,
    mobilePadding: "12px",
  },
  header: {
    fontSize: "16px",
    fontWeight: 600,
  },
  body: {
    fontSize: "14px",
  },
  footer: {
    fontSize: "13px",
    color: "#6b7280",
  },
  divider: {
    color: "var(--secondary-main)",
    thickness: "1px",
    style: "solid",
    inset: "0",
  },
};

export default theme;