import React, { useEffect } from 'react';
import Button from '../ui/Button';
import Robot from '../ui/Robot/Robot';
import useSignupForm  from './useSignUpForm';
import Modal from '../ui/Modal';
import { Sign } from 'crypto';
import { mobileRule, useFormFieldValidator, ValidationResult } from '@karya_app1/rain-js';
import { signup } from './api';
import { set } from 'react-hook-form';
// import { clear } from 'console';
// import api from './../../lib/api'

interface SignUpProps {
    show: boolean;
    setSignupOpen: (val:boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({ show, setSignupOpen }) => {

    const { form, submit, isPasswordFocused, values, validatorInstance, clearAllErrors, clearFieldError } = useSignupForm({
        onSubmit: async (vals) => {
            try{
                await signup({
                    first_name: vals.firstName,
                    last_name: vals.lastName,
                    email: vals.email,
                    mobile: vals.mobile,
                    password: vals.password,
                    confirm_password: vals.confirmPassword
                });
                setSignupOpen(false);
            }
            catch(err){
                
            }
        },
        onChange: (values: any, delta: any) => {
           clearFieldError(delta.name);
        },
    });

    const { addRule } = validatorInstance;
    useEffect(() => {
        addRule('validate_match:password', (value: unknown, options?: Record<string, unknown>) => {
            const isPasswordSame = value === values.password;
            return { key: 'validate_match:password', success: isPasswordSame, fail: !isPasswordSame, message: "Passwords do not match" } as ValidationResult;
        });
        addRule('validate_mobile', (value: unknown, options?: Record<string, unknown>) => {
            return value ? mobileRule(value, options) : { key: 'validate_mobile', success: true, fail: false } as ValidationResult;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.confirmPassword, values.mobile, values.password]);

    return (
        <Modal
            show={show}
            header={<div>Sign up to KARYA</div>}
            onClose={()=>setSignupOpen(false)}
            width={400}
            height={600}
        >
            <Robot hide={isPasswordFocused} />
            {form}
            <div style={{display:'flex', gap: 8, marginTop:32}}>
              <Button color="primary" variant="contained" onClick={submit} disabled={false}>Create account</Button>
              <Button color="secondary" variant="contained" onClick={()=>setSignupOpen(false)}>Cancel</Button>
            </div>
        </Modal>
    );
};
export default SignUp;