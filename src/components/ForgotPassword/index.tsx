import React from 'react';
import Button from '../ui/Button';
import useSignupForm  from './useForgotPassword';
import Modal from '../ui/Modal';
import { forgotPassword } from './api';
import Typography from '../ui/Typography';


interface ForgotPasswordProps {
    show: boolean;
    setForgotPasswordOpen: (val:boolean) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ show, setForgotPasswordOpen }) => {

    const { HeaderText } = Typography

    const { form, submit, clearFieldError } = useSignupForm({
        onSubmit: async (vals) => {
            try{
                await forgotPassword({
                    email: vals.email,
                });
                setForgotPasswordOpen(false);
            }
            catch(err){
                
            }
        },
        onChange: (values: any, delta: any) => {
           clearFieldError(delta.name);
        },
    });

    return (
        <div>
           
            <Modal
                show={show}
                header={<div>Forgot Password</div>}
                onClose={()=>setForgotPasswordOpen(false)}
                width={400}
            >
                 {/* <HeaderText>Enter your email to reset your password</HeaderText> */}
                {form}
                <div style={{display:'flex', gap: 8, marginTop:32}}>
                    <Button color="primary" variant="contained" onClick={submit} disabled={false}>Reset Password</Button>
                    <Button color="secondary" variant="contained" onClick={()=>setForgotPasswordOpen(false)}>Cancel</Button>
                </div>
            </Modal>
        </div>
    );
};
export default ForgotPassword;