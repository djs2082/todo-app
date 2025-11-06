import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'context/ThemeContext';
import Login from 'components/Login';
import SignUp from 'components/SignUp';
import Typography from  'components/ui/Typography';
import Card from 'components/ui/Card';
import { useResponsive } from '@karya_app1/rain-js';
import useUserStore from 'store/userStore';


export default function Landing() {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const { theme } = useTheme();
  const [signupOpen, setSignupOpen] = useState(false);
  const { isSignedIn } = useUserStore();

  const bg = `${process.env.PUBLIC_URL || ''}/images/landing-bg_${theme === 'dark' ? 'dark' : 'light'}.png`;
  const { Title, SubTitle, FooterText } = Typography;

  if(isSignedIn) navigate('/home');

  return (
    <div className={`page-root ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
       <Card style={{ maxWidth: isMobile ? 600 : 400, width: '100%', padding: isMobile ? 4 : 24, textAlign: 'center', height: 'auto' }}> 
        <Title>KARYA</Title>
        <SubTitle>Beautiful tasks, built for focus</SubTitle>
        <div className="landing-form">
          <Login setSignupOpen={setSignupOpen} />
        </div>
        <FooterText>By continuing you agree to our <a href="/terms">Terms</a></FooterText>
      <SignUp show={signupOpen} setSignupOpen={setSignupOpen} />
      </Card> 
    </div>
   
  );
}
