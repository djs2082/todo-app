import React from 'react';
import Button from '../ui/Button';
import Robot from '../ui/Robot/Robot';
import { useLoginForm } from './useLoginForm';

const Login = () => {
    const { form, submit, isPasswordFocused } = useLoginForm({
        onSubmit: async (vals) => {
            // Add actual login logic here
            // eslint-disable-next-line no-console
            console.log('Logging in with', vals);
        },
        onChange: (vals) => {
            // eslint-disable-next-line no-console
            console.log('Form values changed:', vals);
        },
    });

    return (
        <div className="landing-form">
            <Robot hide={isPasswordFocused} />
            {form}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
                <Button variant="contained" onClick={submit} disabled={false}>
                    Log in
                </Button>
                <Button variant="contained" color="secondary" onClick={submit} disabled={false}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
};
export default Login;