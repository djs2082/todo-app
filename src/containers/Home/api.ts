import { client } from '../../http';
import { Priority, Status } from './model';

export type FetchTasksPayload = {
};

type Task = {
    id: string | number;
    title: string;
    description: string;
    due_date_time: string;
    priority: Priority;
    status: Status
};
export type FetchTasksResponse = {
    message?: string;
    data?: { [key in Status]: Task[] };
};


export async function fetchTasks(payload: FetchTasksPayload): Promise<FetchTasksResponse> {
    try {
        const res = await client.get('/tasks', { params: payload });
        return (res as any).data as FetchTasksResponse;
    } catch (error) {
        console.error('Fetch tasks API error:', error);
        return Promise.reject(error);
    }
}

export default { fetchTasks };