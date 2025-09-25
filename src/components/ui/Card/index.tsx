import React from 'react';
import { Card as RainCard, CardThemeProvider, CardProps as RainCardProps } from '@karya_app1/rain-js';
import theme from './theme'

const Card: React.FC<RainCardProps> = (props) => {
  return (
    <CardThemeProvider theme={theme}>
      <RainCard {...props} />
    </CardThemeProvider>
  );
};

export default Card;
