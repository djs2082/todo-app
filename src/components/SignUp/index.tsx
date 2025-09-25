import React from 'react';
import Button from '../ui/Button';
import Robot from '../ui/Robot/Robot';
import useSignupForm  from './useSignUpForm';
import Modal from '../ui/Modal';
import { Sign } from 'crypto';

interface SignUpProps {
    show: boolean;
    setSignupOpen: (val:boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({ show, setSignupOpen }) => {
    const { form, submit, isPasswordFocused } = useSignupForm({
        onSubmit: async (vals) => {
            // Add actual signup logic here
            // eslint-disable-next-line no-console
            console.log('Signing up with', vals);
        },
        onChange: (vals) => {
            // eslint-disable-next-line no-console
            console.log('Form values changed:', vals);
        },
    });

    return (
        <Modal
            show={show}
            header={<div>Sign up to KARYA</div>}
            onClose={()=>setSignupOpen(false)}
            width={400}
        >
            <Robot hide={isPasswordFocused} />
            {form}
            <div style={{display:'flex', gap: 8, marginTop:32}}>
              <Button color="primary" variant="contained" onClick={submit} disabled={false}>Create account</Button>
              <Button color="secondary" variant="contained" onClick={()=>setSignupOpen(false)}>Cancel</Button>
            </div>
        </Modal>
        // <div className="landing-form">
        //     <Robot hide={isPasswordFocused} />
        //     {form}
        //     <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
        //         <Button variant="contained" onClick={submit} disabled={false}>
        //             Log in
        //         </Button>
        //         <Button variant="contained" color="secondary" onClick={submit} disabled={false}>
        //             Sign Up
        //         </Button>
        //     </div>
        // </div>
    );
};
export default SignUp;