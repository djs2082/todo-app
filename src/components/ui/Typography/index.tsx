import React from 'react';
import { Typography as RainTypography, TypographyProps as RainTypographyProps } from '@karya_app1/rain-js';

export type { RainTypographyProps as TypographyProps };

const Title: React.FC<RainTypographyProps> = (props) => (
  <RainTypography.Title {...props}>{props.children}</RainTypography.Title>
);

const SubTitle: React.FC<RainTypographyProps> = (props) => (
  <RainTypography.SubTitle {...props}>{props.children}</RainTypography.SubTitle>
);

const HeaderText: React.FC<RainTypographyProps> = (props) => (
  <RainTypography.HeaderText {...props}>{props.children}</RainTypography.HeaderText>
);

const FooterText: React.FC<RainTypographyProps> = (props) => (
  <RainTypography.FooterText {...props}>{props.children}</RainTypography.FooterText>
);

const HelperText: React.FC<RainTypographyProps> = (props) => (
  <RainTypography.HelperText {...props}>{props.children}</RainTypography.HelperText>
);

const ErrorText: React.FC<RainTypographyProps> = (props) => (
  <RainTypography.ErrorText {...props}>{props.children}</RainTypography.ErrorText>
);

const SuccessText: React.FC<RainTypographyProps> = (props) => (
  <RainTypography.SuccessText {...props}>{props.children}</RainTypography.SuccessText>
);

const Text: React.FC<RainTypographyProps> = (props) => {
  // Fallback if the underlying library uses a different key (e.g., Body)
  const AnyText: React.ComponentType<any> =
    (RainTypography as any).Text || (RainTypography as any).Body || RainTypography.HelperText;
  return <AnyText {...props}>{props.children}</AnyText>;
};

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
  Text,
};

export default Typography;