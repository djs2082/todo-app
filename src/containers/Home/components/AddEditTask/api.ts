import { resumeTask } from '../TaskCard/api';
import { client } from './../../.././../http';

export type AddTaskPayload = {
    title: string;
    description: string;
    due_date_time: string
    priority: string;
};

export type AddTaskResponse = {
    message?: string;
    data?: { [key: string]: any };
};


export async function addTask(payload: AddTaskPayload): Promise<AddTaskResponse> {
    try {
    const res = await client.post('/tasks', { task: payload });
    return (res as any).data as AddTaskResponse;
    } catch (error) {
        console.error('Add Task API error:', error);
        return Promise.reject(error);
    }
}

export async function updateTask(id: number, payload: AddTaskPayload): Promise<AddTaskResponse> {
    try {
        const res = await client.put(`/tasks/${id}`, { task: payload });
        return (res as any).data as AddTaskResponse;
    } catch (error) {
        console.error('Update Task API error:', error);
        return Promise.reject(error);
    }
}

export default { addTask, updateTask, resumeTask};
