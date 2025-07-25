import { login_user_api_endpoint, auth_api_endpoint,
         get_admin_name_api_endpoint } from '../data/items.js';

export async function user_login( email, password ) {
    const response = await fetch( login_user_api_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    return response;
}

export async function get_user_credentials() {
    try {
        const response = await fetch( auth_api_endpoint, {
            method: 'POST',
            credentials: 'include',
        });
        return response;
    } catch (err) {
        console.error('Cookie verification failed', err);
        throw err;
    }
}


export async function verify_jwt() {
    try {

        const response = await get_user_credentials();
        if (!response.ok) return false

        const user = await response.json();
        console.log('User is:', user.user_id);
        return true;
        
    } catch (err) {
        console.error('JWT verification failed', err);
        return false;
    }
}

export async function verify_admin() {

    try {
        const response = await get_user_credentials();

        if (!response.ok) return false

        const user = await response.json();

        if (user.is_admin === true) {
            return true
        } else {
            return false
        }
        
    } catch (err) {
        console.error('JWT verification failed', err);
        return false;
    }
}

