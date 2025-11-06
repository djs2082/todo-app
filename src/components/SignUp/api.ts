import { client } from '../../http';
import { SignupPayload, AuthResponse } from '../../types';

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
    try {
        const res = await client.post('/signup', { user: payload });
        return (res as any).data as AuthResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { signup };

