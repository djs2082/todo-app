import React from 'react';
import { useDynamicForm } from '@karya_app1/rain-js';
import Input from '../ui/Input';
import Button from '../ui/Button';

export type LoginDetails = {
	email: string;
	password: string;
};

export type UseLoginFormOptions = {
	onSubmit?: (vals: LoginDetails) => Promise<void> | void;
	onChange?: (vals: Partial<LoginDetails>) => void;
};

export function useLoginForm(options: UseLoginFormOptions = {}) {
	const { onSubmit, onChange } = options;
	const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

	const { form, values, submit, errors } = useDynamicForm<LoginDetails>(
		{
			fields: [
				{
					name: 'email',
					label: 'Email',
					type: 'email',
					inputProps: { fullWidth: true, floatingLabel: true },
					validators: ['validate_required', 'validate_email'],
				},
				{
					name: 'password',
					label: 'Password',
					type: 'password',
					validate: ['validate_required', 'validate_password'],
					inputProps: {
						fullWidth: true,
						floatingLabel: true,
						onFocus: () => setIsPasswordFocused(true),
						onBlur: () => setIsPasswordFocused(false),
					},
				},
			],
			submit: {
				label: 'Login',
				onSubmit: async (vals) => {
					if (onSubmit) {
						await onSubmit(vals);
					} else {
						// default noop
						// eslint-disable-next-line no-console
						console.log('Logging in with', vals);
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

export default useLoginForm;


