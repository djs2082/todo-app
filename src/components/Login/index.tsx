import React from 'react';
import Button from '../ui/Button';
import Robot from '../ui/Robot/Robot';
import { useLoginForm } from './useLoginForm';
import { client } from './../../http'
import { login } from './api';

interface LoginProps {
    setSignupOpen: (val:boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setSignupOpen }) => {
    const { form, submit, isPasswordFocused } = useLoginForm({
        onSubmit: async (vals) => {
            try {
                await login({email: vals.email, password: vals.password});
            } catch (error) {
               
            }
        },
        onChange: (vals) => {
        },
    });

    return (
        <div className="landing-form">
            <Robot hide={isPasswordFocused} />
            {form}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: "24px" }}>
                <Button variant="contained" onClick={submit} disabled={false}>
                    Log in
                </Button>
                <Button variant="contained" color="secondary" onClick={()=>setSignupOpen(true)} disabled={false}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
};
export default Login;