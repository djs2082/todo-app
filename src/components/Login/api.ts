import { client } from '../../http';

export type LoginPayload = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token?: string;
	user?: any;
	[key: string]: any;
};


export async function login(payload: LoginPayload): Promise<LoginResponse> {
    try {
    const res = await client.post('/login', { user: payload });
    return (res as any).data as LoginResponse;
    } catch (error) {
        console.error('Login API error:', error);
        return Promise.reject(error);
    }
}

export default { login };
