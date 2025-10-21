import type { TypographyTheme } from '@karya_app1/rain-js';

const theme: TypographyTheme = {
  base: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    color: "#111827",
  },
  title: {
    as: "h1",
    fontSize: "26px",
    fontWeight: 800,
    lineHeight: 1.25,
    margin: "0 0 8px 0",
    color: "var(--primary-main)",
  },
  subTitle: {
    as: "h2",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: 1.3,
    margin: "0 0 8px 0",
   color: "var(--primary-main)"
  },
  headerText: {
    as: "h3",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.35,
    margin: "0 0 6px 0",
  },
    bodyText: {
    as: "p",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.6,
    margin: "0 0 10px 0",
    color: "var(--primary-main)",
  },
  footerText: {
    as: "p",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: 1.5,
    margin: "8px 0 0 0",
    color: "var(--primary-main)",
  },
  helperText: {
    as: "p",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: 1.4,
    margin: "4px 0 0 0",
    color: "#6b7280",
  },
  errorText: {
    as: "p",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: 1.4,
    margin: "4px 0 0 0",
    color: "#dc2626",
  },
  successText: {
    as: "p",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: 1.4,
    margin: "4px 0 0 0",
    color: "#16a34a",
  },
};

export default theme;
