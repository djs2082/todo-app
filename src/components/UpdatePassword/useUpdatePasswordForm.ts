import React from 'react';
import { useDynamicForm, useFormFieldValidator } from '@karya_app1/rain-js';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { UpdatePasswordFormData, FormHookOptions } from '../../types';

export function useUpdatePasswordForm(options: FormHookOptions<UpdatePasswordFormData> = {}) {
    const { onSubmit, onChange } = options;
    const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);
    const validatorInstance = useFormFieldValidator();

    const { form, values, submit, errors, clearAllErrors, clearFieldError } = useDynamicForm<UpdatePasswordFormData>(
        {
            fields: [
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
                label: 'Update Password',
                onSubmit: async (values: UpdatePasswordFormData) => {
                    if (onSubmit) {
                        await onSubmit(values);
                    } else {
                    }
                },
            },
            onChange: (values: UpdatePasswordFormData, delta?: { name: keyof UpdatePasswordFormData & string; value: any }) => {
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

export default useUpdatePasswordForm;


