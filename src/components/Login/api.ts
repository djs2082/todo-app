import { client } from '../../http';
import { LoginPayload, AuthResponse } from '../../types';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
    try {
    const res = await client.post('/login', { user: payload });
    return (res as any).data as AuthResponse;
    } catch (error) {
        console.error('Login API error:', error);
        return Promise.reject(error);
    }
}

export default { login };
