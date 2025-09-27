import { NavBarTheme } from '@karya_app1/rain-js';

const theme: NavBarTheme = {
  container: {
    height: "60px",
    background: "var(--header-bg)",
    shadow: "0 20px 50px var(--primary-main-shadow)",
    color: "var(--primary-main)",
    paddingX: "16px",
    borderBottom: "1px solid var(--secondary-main)",
    zIndex: 200,
  },
  brand: {
    fontSize: "16px",
    fontWeight: 600,
    color: "var(--primary-main)",
  },
  link: {
    color: "var(--primary-main)",
    hoverColor: "var(--secondary-main-hover)",
    activeColor: "var(--secondary-main-hover",
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "6px",
  },
  menu: {
    gap: "16px",
    mobileBackground: "var(--secondary-main)",
    mobileMenuBorder: "2px solid var(--secondary-main-shadow)",
    mobileMenuMargin: "0 2px",
    mobileMenuMinWidth: 96,
    mobileMenuMaxWidth: "200vw",
  },
  hamburger: {
    color: "var(--primary-main)",
    size: "20px",
  },
  breakpoint: 768,
};

export default theme;
