import { client } from '../../http';
import { ActivateAccountPayload, AuthResponse } from '../../types';

export async function activateAccount(payload: ActivateAccountPayload): Promise<AuthResponse> {
    try {
    const res = await client.put('/activate', { data: payload, show_error: false, show_success: false });
    return (res as any).data as AuthResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { activateAccount };
