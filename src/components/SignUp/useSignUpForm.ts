import React from 'react';
import { useDynamicForm, useFormFieldValidator } from '@karya_app1/rain-js';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { SignupFormData, FormHookOptions } from '../../types';

export function useSignUpForm(options: FormHookOptions<SignupFormData> = {}) {
    const { onSubmit, onChange } = options;
    const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);
    const validatorInstance = useFormFieldValidator();

    const { form, values, submit, errors, clearAllErrors, clearFieldError } = useDynamicForm<SignupFormData>(
        {
            fields: [
                {
                    name: 'firstName',
                    label: 'First Name',
                    type: 'text',
                    defaultValue: '',
                    inputProps: { fullWidth: true, floatingLabel: true },
                    validators: ['validate_required'],
                    required: true,
                },
                {
                    name: 'lastName',
                    label: 'Last Name',
                    type: 'text',
                    defaultValue: '',
                    inputProps: { fullWidth: true, floatingLabel: true },
                    validators: ['validate_required'],
                    required: true,
                },
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    defaultValue: '',
                    inputProps: { fullWidth: true, floatingLabel: true },
                    validators: ['validate_required', 'validate_email'],
                    required: true,
                },
                {
                    name: 'mobile',
                    label: 'Mobile Number',
                    defaultValue: '',
                    type: 'text',
                    inputProps: { fullWidth: true, floatingLabel: true },
                    validators: ['validate_mobile'],
                },
                {
                    name: 'password',
                    label: 'Password',
                    type: 'password',
                    defaultValue: '',
                    inputProps: { fullWidth: true, floatingLabel: true, 						
                        onFocus: () => setIsPasswordFocused(true),
						onBlur: () => setIsPasswordFocused(false), },
                    validate: ['validate_required', 'validate_password'],
                    required: true,
                },
                {
                    name: 'confirmPassword',
                    label: 'Confirm Password',
                    type: 'password',
                    defaultValue: '',
                    inputProps: { fullWidth: true, floatingLabel: true,
                        onFocus: () => setIsPasswordFocused(true),
						onBlur: () => setIsPasswordFocused(false),
                     },
                    validate: ['validate_required', 'validate_password', 'validate_match:password'],
                    required: true,
                }
            ],
            submit: {
                label: 'Sign Up',
                onSubmit: async (values: SignupFormData) => {
                    if (onSubmit) {
                        await onSubmit(values);
                    } else {
                    }
                },
            },
            onChange: (values: SignupFormData, delta?: { name: keyof SignupFormData & string; value: any }) => {
                if (onChange) onChange(values, delta);
            },
        },
        {
            InputComponent: Input,
            ButtonComponent: Button,
            validatorInstance: validatorInstance,

        },
    );

    return { form, values, submit, errors, isPasswordFocused, validatorInstance, clearAllErrors, clearFieldError };
}

export default useSignUpForm;


