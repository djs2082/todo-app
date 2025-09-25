// import React from 'react';
// import MuiButton, { ButtonProps } from '@mui/material/Button';

// export type AppButtonProps = ButtonProps & { sx?: any };

// export default function Button(props: AppButtonProps) {
//   return <MuiButton variant="contained" {...props} />;
// }

import React from 'react';
import { PageLayout as RainPageLayout, PageLayoutThemeProvider, PageLayoutProps as RainPageLayoutProps, ModalTheme } from '@karya_app1/rain-js';
import theme from './theme'

const PageLayout: React.FC<RainPageLayoutProps> = (props) => {
  return (
    <PageLayoutThemeProvider theme={theme}>
      <RainPageLayout {...props} />
    </PageLayoutThemeProvider>
  );
};

export default PageLayout;
