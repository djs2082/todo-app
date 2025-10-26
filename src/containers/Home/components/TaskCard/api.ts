import { Status } from '../../model';
import { client } from './../../../../http'
import { PauseDetails } from './useTaskPauseForm';

export type TodoTask = {
    id: number;
    title: string;
    description?: string;
    status: Status;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    dueTime?: string;
    [key: string]: any;
};

export type AddTaskResponse = {
    message: string;
    data: { 
        id: number;
    };
}

export async function addTask(payload: TodoTask): Promise<AddTaskResponse> {
    try {
    const res = await client.post('/tasks', { data: { task: payload } });
    return (res as any).data as AddTaskResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function startTask(id: number): Promise<{ message: string; data: TodoTask }> {
    try {
    const res = await client.post(`/tasks/${id}/start`);
    return (res as any).data as { message: string; data: TodoTask };
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function deleteTask(id: number): Promise<{ message: string }> {
    try {
    const res = await client.delete(`/tasks/${id}`);
    return (res as any).data as { message: string };
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function completeTask(id: number): Promise<{ message: string; data: TodoTask }> {
    try {
    const res = await client.post(`/tasks/${id}/complete`);
    return (res as any).data as { message: string; data: TodoTask };
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function pauseTask(id: string | number, payload: PauseDetails): Promise<{ message: string; data: TodoTask }> {
    try {
    const res = await client.post(`/tasks/${id}/pause`, { data: {pause: payload } });
    return (res as any).data as { message: string; data: TodoTask };
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function resumeTask(id: string | number): Promise<{ message: string; data: TodoTask }> {
    try {
    const res = await client.post(`/tasks/${id}/resume`);
    return (res as any).data as { message: string; data: TodoTask };
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { addTask, startTask, deleteTask, completeTask,  pauseTask, resumeTask };