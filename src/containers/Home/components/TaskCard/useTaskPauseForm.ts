import React from 'react';
import { useDynamicForm } from '@karya_app1/rain-js';
import Input from './../../../../components/ui/Input';
import Button from './../../../../components/ui/Button';

export type PauseDetails = {
	reason: string;
	progress: number;
	comment: string;
};

export type UsePauseFormOptions = {
	onSubmit?: (vals: PauseDetails) => Promise<void> | void;
	onChange?: (vals: Partial<PauseDetails>) => void;
};

export function usePauseForm(options: UsePauseFormOptions = {}) {
	const { onSubmit, onChange } = options;

	const { form, values, submit, errors } = useDynamicForm<PauseDetails>(
		{
			fields: [
				{
					name: 'reason',
					label: 'Reason',
					type: 'text',
					inputProps: { fullWidth: true, floatingLabel: true },
					validators: ['validate_required'],
				},
				{
					name: 'progress',
					label: 'Progress%',
					type: 'number',
					validate: ['validate_required'],
					inputProps: {
						fullWidth: true,
						floatingLabel: true,
					},
				},
				{
					name: 'comment',
					label: 'Comment',
					type: 'text',
					validate: ['validate_required'],
					inputProps: {
						fullWidth: true,
						floatingLabel: true,
						multiline: true,
					},
				},
			],
			submit: {
				label: 'Pause Task',
				onSubmit: async (vals) => {
					if (onSubmit) {
						await onSubmit(vals);
					} else {
						// default noop
						// eslint-disable-next-line no-console
						console.log('Pausing task with', vals);
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

	return { form, values, submit, errors };
}

export default usePauseForm;


