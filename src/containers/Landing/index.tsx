import React, { useState } from 'react';
import { Input, Checkbox, Modal, useToast } from '../../components/ui';
import Robot from '../../components/ui/Robot/Robot';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { useTheme } from '../../context/ThemeContext';
// import { Button, ButtonThemeProvider, type ButtonTheme } from '@karya_app1/rain-js';
import RainButton from './../../components/ui/Button';
import './landing.css';
import { log } from 'console';
import Login from '../../components/Login';
import SignUp from '../../components/SignUp';


function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validateMobile(v: string) {
  return /^\+?[0-9]{7,15}$/.test(v);
}

export default function Landing() {
  const toast = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [signupOpen, setSignupOpen] = useState(false);
  const bg = `${process.env.PUBLIC_URL || ''}/images/landing-bg_${theme === 'dark' ? 'dark' : 'light'}.png`;

  // login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // signup state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [signupErrors, setSignupErrors] = useState<Record<string, string | undefined>>({});

  const doLogin = () => {
    const errs: typeof loginErrors = {};
    if (!loginEmail) errs.email = 'Email is required';
    else if (!validateEmail(loginEmail)) errs.email = 'Enter a valid email';
    if (!loginPassword) errs.password = 'Password is required';
    setLoginErrors(errs);
    if (Object.keys(errs).length === 0) {
      // perform login action (API call)
      setLoginLoading(true);
      api.login(loginEmail, loginPassword).then((res:any)=>{
        // expected res contains token
        if (res?.token) localStorage.setItem('auth_token', res.token);
        toast.show('Logged in', 'success');
        navigate('/tasks');
        console.log('login success', res);
      }).catch((err:any)=>{
        const msg = err?.body?.message || err.message || 'Login failed';
        setLoginErrors({ email: msg });
        toast.show(msg, 'error');
      }).finally(()=>setLoginLoading(false));
    }
  };

  const doSignup = () => {
    const errs: Record<string, string> = {};
    if (!firstName) errs.firstName = 'First name is required';
    if (!signupEmail) errs.email = 'Email is required';
    else if (!validateEmail(signupEmail)) errs.email = 'Enter a valid email';
  if (!signupPassword) errs.password = 'Password is required';
    else if (signupPassword.length < 6) errs.password = 'Password must be at least 6 characters';
  if (!confirmPassword) errs.confirmPassword = 'Confirm password is required';
  else if (confirmPassword !== signupPassword) errs.confirmPassword = 'Passwords do not match';
    if (mobile && !validateMobile(mobile)) errs.mobile = 'Enter a valid mobile number';
  if (!agree) errs.agree = 'You must agree to the terms';
    setSignupErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSignupLoading(true);
      api.signup({ firstName, lastName, email: signupEmail, mobile, password: signupPassword }).then((res:any)=>{
        toast.show('Account created', 'success');
        console.log('signup success', res);
        setSignupOpen(false);
      }).catch((err:any)=>{
        const msg = err?.body?.message || err.message || 'Signup failed';
        setSignupErrors({ ...errs, email: msg });
        toast.show(msg, 'error');
      }).finally(()=>setSignupLoading(false));
    }
  };

  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  return (
    <div className={`landing-root ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <div className="landing-card">
        <div className="landing-brand">KARYA</div>
        <div className="landing-sub">Beautiful tasks, built for focus</div>
        <div className="landing-form">
          <Login setSignupOpen={setSignupOpen} />
        </div>
      <div className="landing-footer">By continuing you agree to our <a href="/terms">Terms</a></div>
      </div>
      <SignUp show={signupOpen} setSignupOpen={setSignupOpen} />
    </div>
  );
}
