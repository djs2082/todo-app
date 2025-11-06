import { client } from '../../http';
import { UpdatePasswordPayload, UpdatePasswordResponse } from '../../types';

export async function updatePassword(payload: UpdatePasswordPayload): Promise<UpdatePasswordResponse> {
    try {
    const res = await client.put('/password/reset', { token: payload.token, password: payload.password, password_confirmation: payload.confirmPassword });
    return (res as any).data as UpdatePasswordResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { updatePassword };
