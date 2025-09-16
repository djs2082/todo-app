import React, { useState } from 'react';
import { Input, Button, Checkbox, Modal } from '../../components/ui';
import './landing.css';

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validateMobile(v: string) {
  return /^\+?[0-9]{7,15}$/.test(v);
}

export default function Landing() {
  const [signupOpen, setSignupOpen] = useState(false);

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
      console.log('login', { loginEmail, loginPassword });
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
      // submit signup (API call)
      console.log('signup', { firstName, lastName, signupEmail, mobile });
      setSignupOpen(false);
    }
  };

  return (
    <div className="landing-root">
      <div className="landing-card">
        <div className="landing-brand">KARYA</div>
        <div className="landing-sub">Beautiful tasks, built for focus</div>

        <div className="landing-form">
          <Input name="email" type="email" label="Email" value={loginEmail} onChange={(v)=>setLoginEmail(v)} errorText={loginErrors.email} />
          <Input name="password" type="password" label="Password" value={loginPassword} onChange={(v)=>setLoginPassword(v)} errorText={loginErrors.password} />
          <div style={{display: 'flex', gap: 8, alignItems: 'center', marginTop: 8}}>
            <Button variant="contained" onClick={doLogin} sx={{flex: 1}}>Log in</Button>
            <Button variant="outlined" onClick={()=>setSignupOpen(true)}>Sign up</Button>
          </div>
        </div>

  <div className="landing-footer">By continuing you agree to our <a href="/terms">Terms</a></div>
      </div>

      <Modal open={signupOpen} title={<div>Sign up to KARYA</div>} onClose={()=>setSignupOpen(false)} maxWidth={560}>
        <div style={{display:'grid', gap:12}}>
          <Input name="firstName" label="First name" value={firstName} onChange={(v)=>setFirstName(v)} errorText={signupErrors.firstName} />
          <Input name="lastName" label="Last name" value={lastName} onChange={(v)=>setLastName(v)} />
          <Input name="email" type="email" label="Email" value={signupEmail} onChange={(v)=>setSignupEmail(v)} errorText={signupErrors.email} />
          <Input name="mobile" label="Mobile" value={mobile} onChange={(v)=>setMobile(v)} errorText={signupErrors.mobile} />
          <Input name="password" type="password" label="Password" value={signupPassword} onChange={(v)=>setSignupPassword(v)} errorText={signupErrors.password} />
          <Input name="confirmPassword" type="password" label="Confirm password" value={confirmPassword} onChange={(v)=>setConfirmPassword(v)} errorText={signupErrors.confirmPassword} />
          <div style={{display:'flex', flexDirection: 'column', gap:8}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <Checkbox label="I agree to the terms" checked={agree} onChange={(c)=>setAgree(c)} />
            </div>
            {signupErrors.agree && <div style={{color: 'rgb(211, 47, 47)', fontSize: 13}}>{signupErrors.agree}</div>}
          </div>
          <div style={{display:'flex', gap:8, marginTop:6}}>
            <Button variant="contained" onClick={doSignup} sx={{flex:1}}>Create account</Button>
            <Button variant="text" onClick={()=>setSignupOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
