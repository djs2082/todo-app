import React from 'react';
import { Icon as RainIcon, IconThemeProvider, IconProps as RainIconProps } from '@karya_app1/rain-js';
import theme from './theme'

const Icon: React.FC<RainIconProps> = (props) => {
  return (
    <IconThemeProvider theme={theme}>
      <RainIcon {...props} />
    </IconThemeProvider>
  );
};

export default Icon;
