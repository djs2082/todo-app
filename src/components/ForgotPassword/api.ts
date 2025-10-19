import { client } from '../../http';

export type ForgotPasswordPayload = {
    email: string;
};

export type ForgotPasswordResponse = {
    message?: string;
};

export async function forgotPassword(payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
    try {
        const res = await client.post('password/forgot', payload);
        return (res as any).data as ForgotPasswordResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { forgotPassword };

