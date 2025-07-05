import { username_api_endpoint } from '../data/items.js';

export async function get_username() {
    const response = await fetch( username_api_endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    return response;
}

