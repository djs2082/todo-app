import React, { useState } from 'react';
import { Input, Button, Checkbox, Modal } from '../../components/ui';
import './landing.css';

export default function Landing() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <div className="landing-root">
      <div className="landing-card">
        <div className="landing-brand">KARYA</div>
        <div className="landing-sub">Beautiful tasks, built for focus</div>

        <div className="landing-form">
          <Input name="email" type="email" label="Email" value={loginEmail} onChange={(v)=>setLoginEmail(v)} />
          <Input name="password" type="password" label="Password" value={loginPassword} onChange={(v)=>setLoginPassword(v)} />
          <div style={{display: 'flex', gap: 8, alignItems: 'center', marginTop: 8}}>
            <Button variant="contained" onClick={()=>{ /* TODO: login */ }} sx={{flex: 1}}>Log in</Button>
            <Button variant="outlined" onClick={()=>setSignupOpen(true)}>Sign up</Button>
          </div>
        </div>

        <div className="landing-footer">By continuing you agree to our <a href="#">Terms</a></div>
      </div>

      <Modal open={signupOpen} title={<div>Sign up to KARYA</div>} onClose={()=>setSignupOpen(false)} maxWidth={560}>
        <div style={{display:'grid', gap:12}}>
          <Input name="firstName" label="First name" value={''} onChange={()=>{}} />
          <Input name="email" type="email" label="Email" value={''} onChange={()=>{}} />
          <Input name="password" type="password" label="Password" value={''} onChange={()=>{}} />
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <Checkbox label="I agree to the terms" checked={agree} onChange={(c)=>setAgree(c)} />
          </div>
          <div style={{display:'flex', gap:8, marginTop:6}}>
            <Button variant="contained" onClick={()=>{ /* TODO: submit */ }} sx={{flex:1}}>Create account</Button>
            <Button variant="text" onClick={()=>setSignupOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
