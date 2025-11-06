import React from 'react';
import Button from 'components/ui/Button';
import Robot from 'components/ui/Robot/Robot';
import { useLoginForm } from './useLoginForm';
import { login } from './api';
import Typography from 'components/ui/Typography';
import ForgotPassword from '../ForgotPassword';
import useUserStore from 'store/userStore';

interface LoginProps {
    setSignupOpen: (val:boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setSignupOpen }) => {

    const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);

    const userStore  = useUserStore();
    const { signIn, setUser } = userStore;



    const { HelperText } = Typography;

    const { form, submit, isPasswordFocused } = useLoginForm({
        onSubmit: async (vals) => {
            try {
                const res = await login({email: vals.email, password: vals.password});
                signIn(res.data.user)
                sessionStorage.setItem('access_token', res.data.access_token);
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