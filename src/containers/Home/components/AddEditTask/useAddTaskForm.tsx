import React, { use } from 'react';
import { useDynamicForm } from '@karya_app1/rain-js';
import Input from './../../../../components/ui/Input';
import Button from './../../../../components/ui/Button';
import DatePicker from '../../../../components/ui/DatePicker';
import TimePicker from '../../../../components/ui/DatePicker';
import { Priority, Status, TaskData } from '../../model';
import useTaskStore from '../../store';

interface Task {
  id: string | number;
  title: string;
  description: string;
  priority: Priority;
  due_date_time: string;
  status: Status;
}

export type PauseDetails = {
    title: string;
    description: string;
    date: string;
    time: string;
    priority: Priority;
};

export type UseAddTaskFormOptions = {
    onSubmit?: (vals: PauseDetails) => Promise<void> | void;
    onChange?: (vals: Partial<PauseDetails>) => void;
    taskToEdit?: Task;
};

export function useAddTaskForm(options: UseAddTaskFormOptions = {}) {
    const { onSubmit, onChange, taskToEdit } = options;
    // const { taskToEdit } = useTaskStore();
    console.log('taskToEdit in useAddTaskForm', taskToEdit);
    const { form, values, submit, errors } = useDynamicForm<PauseDetails>(
        {
            fields: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'input',
                    inputProps: { fullWidth: true, floatingLabel: true },
                    defaultValue:   taskToEdit?.title,
                    validators: ['validate_required'],
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'input',
                    validate: ['validate_required'],
                    defaultValue: taskToEdit?.description,
                    inputProps: {
                        fullWidth: true,
                        floatingLabel: true,
                    },
                },
                {
                    name: 'date',
                    label: 'Date',
                    type: 'date',
                    validate: ['validate_required'],
                    inputProps: {
                        floatingLabel: true,
                        style: { width: "50%" },
                        placeholder: ""
                    },
                    // defaultValue: utcString ? dateStr : undefined,
                    datePickerProps: {
                        placeholder: "",
                    },
                },
                {
                    name: 'time',
                    label: 'Time',
                    type: 'time',
                    validate: ['validate_required'],
                    inputProps: {
                        floatingLabel: true,
                        style: { width: "50%" },
                    },
                }
            ],
            submit: {
                label: 'Add Task',
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
            // fieldsGroupStyle: {
            //     display: "grid",
            //     gridTemplateColumns: "1fr",
            //     gap: "20px",
            // }
        },  
   
    );

    return { form, values, submit, errors };
}

export default useAddTaskForm;


