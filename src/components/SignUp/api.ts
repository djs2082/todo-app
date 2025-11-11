import { client } from '../../http';

export type SignupPayload = {
    first_name: string;
    last_name: string;
    email: string;
    mobile?: string;
    password: string;
    confirm_password: string;
};

export type SignupResponse = {
    token?: string;
    user?: any;
    [key: string]: any;
};

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
    try {
        const res = await client.post('/signup', { user: payload, show_error: true });
        return (res as any).data as SignupResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { signup };

