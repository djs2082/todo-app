import React from 'react';
import { useDynamicForm } from '@karya_app1/rain-js';
import Input from '../ui/Input';
import Button from '../ui/Button';

export type LoginDetails = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
};

export type UseSignUpFormOptions = {
    onSubmit?: (vals: LoginDetails) => Promise<void> | void;
    onChange?: (vals: Partial<LoginDetails>) => void;
};

export function useSignUpForm(options: UseSignUpFormOptions = {}) {
    const { onSubmit, onChange } = options;
    const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

    const { form, values, submit, errors } = useDynamicForm<LoginDetails>(
        {
            fields: [
                {
                    name: 'firstName',
                    label: 'First Name',
                    type: 'text',
                    inputProps: { fullWidth: true, floatingLabel: true },
                    validators: ['validate_required'],
                },
                {
                    name: 'lastName',
                    label: 'Last Name',
                    type: 'text',
                     inputProps: { fullWidth: true, floatingLabel: true },
                    validators: ['validate_required'],
                },
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    inputProps: { fullWidth: true, floatingLabel: true },
                    validators: ['validate_required', 'validate_email'],
                },
                {
                    name: 'mobile',
                    label: 'Mobile Number',
                    type: 'text',
                    inputProps: { fullWidth: true, floatingLabel: true },
                    validators: ['validate_mobile'],
                },
                {
                    name: 'password',
                    label: 'Password',
                    type: 'password',
                    inputProps: { fullWidth: true, floatingLabel: true, 						
                        onFocus: () => setIsPasswordFocused(true),
						onBlur: () => setIsPasswordFocused(false), },
                    validate: ['validate_required', 'validate_password'],
                },
                {
                    name: 'confirmPassword',
                    label: 'Confirm Password',
                    type: 'password',
                    inputProps: { fullWidth: true, floatingLabel: true,
                        onFocus: () => setIsPasswordFocused(true),
						onBlur: () => setIsPasswordFocused(false),
                     },
                    validate: ['validate_required', 'validate_password', 'validate_match:password'],
                }
            ],
            submit: {
                label: 'Sign Up',
                onSubmit: async (vals) => {
                    if (onSubmit) {
                        await onSubmit(vals);
                    } else {
                        // default noop
                        // eslint-disable-next-line no-console
                        console.log('Signing up with', vals);
                    }
                },
            },
            onChange: (vals) => {
                if (onChange) onChange(vals);
                // eslint-disable-next-line no-console
                else console.log('Form values changed:', vals);
            },
        },
        {
            InputComponent: Input,
            ButtonComponent: Button,
        }
    );

    return { form, values, submit, errors, isPasswordFocused };
}

export default useSignUpForm;


