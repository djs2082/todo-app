import React from 'react';
import { useDynamicForm, useFormFieldValidator } from '@karya_app1/rain-js';
import Input from '../ui/Input';
import Button from '../ui/Button';

export type UpdatePasswordDetails = {
    password: string;
    confirmPassword: string;
};

export type UseUpdatePasswordFormOptions = {
    onSubmit?: (vals: UpdatePasswordDetails) => Promise<void> | void;
    onChange?: (vals: Partial<UpdatePasswordDetails>, delta?: { name: keyof UpdatePasswordDetails & string; value: any }) => void;
};

export function useUpdatePasswordForm(options: UseUpdatePasswordFormOptions = {}) {
    const { onSubmit, onChange } = options;
    const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);
    const validatorInstance = useFormFieldValidator();

    const { form, values, submit, errors, clearAllErrors, clearFieldError } = useDynamicForm<UpdatePasswordDetails>(
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
                onSubmit: async (values: UpdatePasswordDetails) => {
                    if (onSubmit) {
                        await onSubmit(values);
                    } else {
                    }
                },
            },
            onChange: (values: UpdatePasswordDetails, delta?: { name: keyof UpdatePasswordDetails & string; value: any }) => {
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


