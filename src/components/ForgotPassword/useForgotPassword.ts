import React from 'react';
import { useDynamicForm, useFormFieldValidator } from '@karya_app1/rain-js';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ForgotPasswordFormData, FormHookOptions } from '../../types';

export function useForgotPasswordForm(options: FormHookOptions<ForgotPasswordFormData> = {}) {
    const { onSubmit, onChange } = options;
    const validatorInstance = useFormFieldValidator();

    const { form, values, submit, errors, clearAllErrors, clearFieldError } = useDynamicForm<ForgotPasswordFormData>(
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
                onSubmit: async (values: ForgotPasswordFormData) => {
                    if (onSubmit) {
                        await onSubmit(values);
                    } else {
                    }
                },
            },
            onChange: (values: ForgotPasswordFormData, delta?: { name: keyof ForgotPasswordFormData & string; value: any }) => {
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


