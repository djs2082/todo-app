import React from 'react';
import { Modal as RainModal, ModalThemeProvider, ModalProps as RainModalProps } from '@karya_app1/rain-js';
import theme from './theme'

const Modal: React.FC<RainModalProps> = (props) => {
  return (
    <ModalThemeProvider theme={theme}>
      <RainModal {...props} />
    </ModalThemeProvider>
  );
};

export default Modal;
