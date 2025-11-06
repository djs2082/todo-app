import { client } from './http'
import { UserResponse } from './types';

export async function fetchUser(id: string | number | undefined): Promise<UserResponse> {
    try {
    const res = await client.get('/users/' + id, {data: { show_error: false, show_success: false }});
    return (res as any).data as UserResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { fetchUser };