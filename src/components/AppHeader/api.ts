import { client } from '../../http';
import { SignOutPayload, SignOutResponse, Theme } from '../../types';

export async function signOut(payload: SignOutPayload): Promise<SignOutResponse> {
    try {
    const res = await client.post('/logout', { data: payload, show_error: false, show_success: false });
    return (res as any).data as SignOutResponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function changeTheme(setting_id: number | undefined, value: Theme): Promise<void> {
    try {
        await client.put('/settings/' + setting_id, 
            { 
                data: { value },
                show_success: false
            });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { signOut, changeTheme };
