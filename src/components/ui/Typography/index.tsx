import React, { ComponentProps } from "react"; 
import RainTypography, { TypographyThemeProvider, type TypographyThemeOverride, TypographyProps } from "@karya_app1/rain-js"; 
import theme from "./theme";

export const AppTypographyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => ( 
  <TypographyThemeProvider theme={theme as TypographyThemeOverride}> {children} </TypographyThemeProvider> );

// export function useTypography() { // Stable identity; not strictly required, but avoids recreating the object per render return React.useMemo( () => ({ Title: Typography.Title, SubTitle: Typography.SubTitle, HeaderText: Typography.HeaderText, FooterText: Typography.FooterText, HelperText: Typography.HelperText, ErrorText: Typography.ErrorText, SuccessText: Typography.SuccessText, }), [] ); }
//   return React.useMemo( () => ({
//     Title: Typography.Title,
//     SubTitle: Typography.SubTitle,
//     HeaderText: Typography.HeaderText,
//     FooterText: Typography.FooterText,
//     HelperText: Typography.HelperText,
//     ErrorText: Typography.ErrorText,
//     SuccessText: Typography.SuccessText,
//   }), [] );
// }


const Title: React.FC<ComponentProps<typeof RainTypography.Title>> = (props) => (
  <AppTypographyProvider>
    <RainTypography.Title {...props}>{props.children}</RainTypography.Title>
  </AppTypographyProvider>
);


const SubTitle: React.FC<ComponentProps<typeof RainTypography.SubTitle>> = (props) => (
  <AppTypographyProvider>
    <RainTypography.SubTitle {...props}>{props.children}</RainTypography.SubTitle>
  </AppTypographyProvider>
);

const BodyText: React.FC<ComponentProps<typeof RainTypography.BodyText>> = (props) => (
  <AppTypographyProvider>
    <RainTypography.BodyText {...props}>{props.children}</RainTypography.BodyText>
  </AppTypographyProvider>
);

const HeaderText: React.FC<ComponentProps<typeof RainTypography.HeaderText>> = (props) => (
  <AppTypographyProvider>
    <RainTypography.HeaderText {...props}>{props.children}</RainTypography.HeaderText>
  </AppTypographyProvider>
);


const FooterText: React.FC<ComponentProps<typeof RainTypography.FooterText>> = (props) => (
  <AppTypographyProvider>
    <RainTypography.FooterText {...props}>{props.children}</RainTypography.FooterText>
  </AppTypographyProvider>
);


const HelperText: React.FC<ComponentProps<typeof RainTypography.HelperText>> = (props) => (
  <AppTypographyProvider>
    <RainTypography.HelperText {...props}>{props.children}</RainTypography.HelperText>
  </AppTypographyProvider>
);


const ErrorText: React.FC<ComponentProps<typeof RainTypography.ErrorText>> = (props) => (
  <AppTypographyProvider>
    <RainTypography.ErrorText {...props}>{props.children}</RainTypography.ErrorText>
  </AppTypographyProvider>
);


const SuccessText: React.FC<ComponentProps<typeof RainTypography.SuccessText>> = (props) => (
  <AppTypographyProvider>
    <RainTypography.SuccessText {...props}>{props.children}</RainTypography.SuccessText>
  </AppTypographyProvider>
);


// import React from 'react';
// import RainTypography, { TypographyProps as RainTypographyProps } from '@karya_app1/rain-js';

// export type { RainTypographyProps as TypographyProps };

// const Title: React.FC<RainTypographyProps> = (props) => (
//   <RainTypography.Title {...props}>{props.children}</RainTypography.Title>
// );

// const SubTitle: React.FC<RainTypographyProps> = (props) => (
//   <RainTypography.SubTitle {...props}>{props.children}</RainTypography.SubTitle>
// );

// const HeaderText: React.FC<RainTypographyProps> = (props) => (
//   <RainTypography.HeaderText {...props}>{props.children}</RainTypography.HeaderText>
// );

// const FooterText: React.FC<RainTypographyProps> = (props) => (
//   <RainTypography.FooterText {...props}>{props.children}</RainTypography.FooterText>
// );

// const HelperText: React.FC<RainTypographyProps> = (props) => (
//   <RainTypography.HelperText {...props}>{props.children}</RainTypography.HelperText>
// );

// const ErrorText: React.FC<RainTypographyProps> = (props) => (
//   <RainTypography.ErrorText {...props}>{props.children}</RainTypography.ErrorText>
// );

// const SuccessText: React.FC<RainTypographyProps> = (props) => (
//   <RainTypography.SuccessText {...props}>{props.children}</RainTypography.SuccessText>
// );

// const Text: React.FC<RainTypographyProps> = (props) => {
//   // Fallback if the underlying library uses a different key (e.g., Body)
//   const AnyText: React.ComponentType<any> =
//     (RainTypography as any).Text || (RainTypography as any).Body || RainTypography.HelperText;
//   return <AnyText {...props}>{props.children}</AnyText>;
// };

const Typography = {
  Title,
  SubTitle,
  // Also expose a camel-cased alias in case of mixed usage
  Subtitle: SubTitle,
  HeaderText,
  FooterText,
  ErrorText,
  SuccessText,
  HelperText,
  BodyText,
  Text,
};

export default Typography;