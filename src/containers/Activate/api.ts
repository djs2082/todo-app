import { client } from '../../http';

export type ActivateAccountPayload = {
    activation_code: string;
};

export type ActivateAccountResponse = {
    token?: string;
    user?: any;
    [key: string]: any;
};

export async function activateAccount(payload: ActivateAccountPayload): Promise<ActivateAccountResponse> {
    try {
    const res = await client.put('/activate', { data: payload, show_error: false, show_success: false });
    return (res as any).data as ActivateAccountResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { activateAccount };
