import React from 'react';
import { useDynamicForm, useFormFieldValidator } from '@karya_app1/rain-js';
import Input from '../ui/Input';
import Button from '../ui/Button';

export type ForgotPasswordDetails = {
    email: string;
};

export type UseForgotPasswordFormOptions = {
    onSubmit?: (vals: ForgotPasswordDetails) => Promise<void> | void;
    onChange?: (vals: Partial<ForgotPasswordDetails>, delta?: { name: keyof ForgotPasswordDetails & string; value: any }) => void;
};

export function useForgotPasswordForm(options: UseForgotPasswordFormOptions = {}) {
    const { onSubmit, onChange } = options;
    const validatorInstance = useFormFieldValidator();

    const { form, values, submit, errors, clearAllErrors, clearFieldError } = useDynamicForm<ForgotPasswordDetails>(
        {
            fields: [
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    defaultValue: '',
                    inputProps: { fullWidth: true, floatingLabel: true },
                    validators: ['validate_required', 'validate_email'],
                    required: true,
                }
            ],
            submit: {
                label: 'Reset Password',
                onSubmit: async (values: ForgotPasswordDetails) => {
                    if (onSubmit) {
                        await onSubmit(values);
                    } else {
                    }
                },
            },
            onChange: (values: ForgotPasswordDetails, delta?: { name: keyof ForgotPasswordDetails & string; value: any }) => {
                if (onChange) onChange(values, delta);
            },
        },
        {
            InputComponent: Input,
            ButtonComponent: Button,
            validatorInstance: validatorInstance,

        },
    );

    return { form, values, submit, clearFieldError };
}

export default useForgotPasswordForm;


