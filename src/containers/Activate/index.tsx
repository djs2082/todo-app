import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import api from '../../lib/api';
import Typography from '../../components/ui/Typography';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '@karya_app1/rain-js';
import { activateAccount } from './api';

type ActivateResponse = {
  ok: boolean;
  message?: string;
};

export default function Activate() {
  const { theme } = useTheme();
  const { isMobile } = useResponsive();
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const navigate = useNavigate();
  const { Title, SubTitle, FooterText } = Typography;

  const [message, setMessage] = React.useState<string>('');
  
  const calledForToken = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
      return;
    }
   
    if (calledForToken.current === token) return;
    calledForToken.current = token;

    setStatus('loading');
    (async () => {
      try {
        const res = await activateAccount({ activation_code: token }) as ActivateResponse | any;
        if (res?.data?.activated) {
          setMessage(res?.message || 'Your account has been activated successfully.');
          setStatus('success');
        } else {
          setMessage(res?.message || 'Activation failed.');
          setStatus('error');
        }
      } catch (err: any) {
        const msg = err?.response?.message || 'Activation failed.';
        setMessage(msg);
        setStatus('error');
      }
    })();
  }, [token, navigate]);

  const bg = `${process.env.PUBLIC_URL || ''}/images/landing-bg_${theme === 'dark' ? 'dark' : 'light'}.png`;

  return (
    <div className={`page-root ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <Card style={{ maxWidth: isMobile ? 600 : 480, width: '100%', padding: isMobile ? 4 : 24, textAlign: 'center', height: 'auto' }}>
        <Title>Account Activation</Title>
        {status === 'loading' && <SubTitle>Activating your account...</SubTitle>}
        {status === 'success' && (
          <>
            <SubTitle>Success!</SubTitle>
            <p style={{ marginTop: 12 }}>{message}</p>
            <div style={{ marginTop: 16 }}>
              <Button variant="contained" onClick={() => navigate('/home')}>Go to app</Button>
            </div>
          </>
        )}
        {status === 'error' && (
          <>
            <SubTitle>Activation Failed</SubTitle>
            <p style={{ marginTop: 12 }}>{message}</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
              <Button variant="outlined" onClick={() => navigate('/')}>Back to home</Button>
              <Button variant="contained" onClick={() => navigate('/')}>
                Try again
              </Button>
            </div>
          </>
        )}
        <FooterText>
          If you continue to see issues, please contact support.
        </FooterText>
      </Card>
    </div>
  );
}