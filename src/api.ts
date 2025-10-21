import { client } from './http'


export type ShowUserResponse = {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    accountName?: string;
    [key: string]: any;
    settings?: {
        id: number;
        key: string;
        value: string;
    }[];
};

export async function fetchUser(id: string | number | undefined): Promise<ShowUserResponse> {
    try {
    const res = await client.get('/users/' + id, {data: { show_error: false, show_success: false }});
    return (res as any).data as ShowUserResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { fetchUser };