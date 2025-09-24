// import React from 'react';
// import MuiButton, { ButtonProps } from '@mui/material/Button';

// export type AppButtonProps = ButtonProps & { sx?: any };

// export default function Button(props: AppButtonProps) {
//   return <MuiButton variant="contained" {...props} />;
// }

import React from 'react';
import { Button as RainButton, ButtonThemeProvider, ButtonProps as RainButtonProps } from '@karya_app1/rain-js';
import theme from './theme'

const Button: React.FC<RainButtonProps> = (props) => {
  return (
    <ButtonThemeProvider theme={theme}>
      <RainButton {...props} />
    </ButtonThemeProvider>
  );
};

export default Button;
