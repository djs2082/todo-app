import { client } from '../../http';
import { FetchTasksResponse } from '../../types';

export type FetchTasksPayload = {};


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