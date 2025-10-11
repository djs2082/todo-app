import React, { use } from 'react';
import { ToastContainer as RainToastContainer, useResponsive} from '@karya_app1/rain-js';
import { ToastThemeProvider} from '@karya_app1/rain-js';
import useToastTheme from './theme';
import useToastStore from './store';

const ToastContainer: React.FC = () => {
    const { isMobile } = useResponsive();
    const { toasts, removeToast } = useToastStore();
    const { theme } = useToastTheme();
  return (
    <ToastThemeProvider theme={theme}>
      <RainToastContainer items={toasts} onClose={removeToast} style={{ bottom: isMobile ? "28px": 'auto', margin: isMobile ? '0' : '0 -12px 0 0' }}  />
    </ToastThemeProvider>
  );
};
export default ToastContainer;
