import { client } from '../../http';

export type SignOutPayload = {
    access_token: string;
};

export type SignOutResponse = {
    message?: string;
}

export async function signOut(payload: SignOutPayload): Promise<SignOutResponse> {
    try {
    const res = await client.post('/logout', { data: payload, show_error: false, show_success: false });
    return (res as any).data as SignOutResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { signOut };
