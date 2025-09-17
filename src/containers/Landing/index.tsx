import React, { useState } from 'react';
import { Input, Button, Checkbox, Modal, useToast } from '../../components/ui';
import Robot from '../../components/ui/Robot/Robot';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { useTheme } from '../../context/ThemeContext';
import './landing.css';

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
      <div className="landing-overlay" />
      <div className="landing-card">
        <div className="landing-brand">KARYA</div>
        <div className="landing-sub">Beautiful tasks, built for focus</div>

        <div className="landing-form">
          <Robot hide={true}/>
          <Input name="email" type="email" label="Email" value={loginEmail} onChange={(v)=>{ setLoginEmail(v); if (loginErrors.email) setLoginErrors({}); }} errorText={loginErrors.email} />
          <Input name="password" type="password" label="Password" value={loginPassword} onChange={(v)=>{ setLoginPassword(v); if (loginErrors.password) setLoginErrors({}); }} errorText={loginErrors.password} />
          <div style={{display: 'flex', gap: 8, alignItems: 'center', marginTop: 8}}>
            <Button variant="contained" onClick={doLogin} sx={{flex: 1}} disabled={loginLoading}>{loginLoading ? 'Signing in...' : 'Log in'}</Button>
            <Button variant="outlined" onClick={()=>setSignupOpen(true)} disabled={signupLoading}>Sign up</Button>
          </div>
        </div>

  <div className="landing-footer">By continuing you agree to our <a href="/terms">Terms</a></div>
      </div>

      <Modal open={signupOpen} title={<div>Sign up to KARYA</div>} onClose={()=>setSignupOpen(false)} maxWidth={560}>
        <div className={`landing-modal-content`}>
          <div style={{display:'grid', gap:12}}>
            <Input name="firstName" label="First name" value={firstName} onChange={(v)=>{ setFirstName(v); if (signupErrors.firstName) setSignupErrors((s)=>({ ...s, firstName: undefined })); }} errorText={signupErrors.firstName} />
            <Input name="lastName" label="Last name" value={lastName} onChange={(v)=>setLastName(v)} />
            <Input name="email" type="email" label="Email" value={signupEmail} onChange={(v)=>{ setSignupEmail(v); if (signupErrors.email) setSignupErrors((s)=>({ ...s, email: undefined })); }} errorText={signupErrors.email} />
            <Input name="mobile" label="Mobile" value={mobile} onChange={(v)=>{ setMobile(v); if (signupErrors.mobile) setSignupErrors((s)=>({ ...s, mobile: undefined })); }} errorText={signupErrors.mobile} />
            <Input name="password" type="password" label="Password" value={signupPassword} onChange={(v)=>{ setSignupPassword(v); if (signupErrors.password) setSignupErrors((s)=>({ ...s, password: undefined })); }} errorText={signupErrors.password} />
            <Input name="confirmPassword" type="password" label="Confirm password" value={confirmPassword} onChange={(v)=>{ setConfirmPassword(v); if (signupErrors.confirmPassword) setSignupErrors((s)=>({ ...s, confirmPassword: undefined })); }} errorText={signupErrors.confirmPassword} />
            <div style={{display:'flex', flexDirection: 'column', gap:8}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <Checkbox label="I agree to the terms" checked={agree} onChange={(c)=>setAgree(c)} />
              </div>
              {signupErrors.agree && <div style={{color: theme === 'dark' ? 'rgb(211, 47, 47)' : 'rgb(211, 47, 47)', fontSize: 13}}>{signupErrors.agree}</div>}
            </div>
            <div style={{display:'flex', gap:8, marginTop:6}}>
              <Button variant="contained" onClick={doSignup} sx={{flex:1}} disabled={signupLoading}>{signupLoading ? 'Creating...' : 'Create account'}</Button>
              <Button variant="text" onClick={()=>setSignupOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
