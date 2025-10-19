import React from 'react';
import Button from '../ui/Button';
import Robot from '../ui/Robot/Robot';
import { useLoginForm } from './useLoginForm';
import { login } from './api';
import Typography from '../ui/Typography';
import ForgotPassword from '../ForgotPassword';

interface LoginProps {
    setSignupOpen: (val:boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setSignupOpen }) => {

    const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);

    const { HelperText } = Typography;

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
            {/* @ts-ignore */}
            <HelperText color="secondary" style={{ marginBottom: "24px" }} onClick={() => setForgotPasswordOpen(true)}>Forgot your password?</HelperText>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: "24px" }}>
                <Button variant="contained" onClick={submit} disabled={false}>
                    Log in
                </Button>
                <Button variant="contained" color="secondary" onClick={()=>setSignupOpen(true)} disabled={false}>
                    Sign Up
                </Button>
            </div>
            <ForgotPassword show={forgotPasswordOpen} setForgotPasswordOpen={setForgotPasswordOpen} />
        </div>
    );
};
export default Login;