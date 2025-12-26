const BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION || "/v1";

export async function api(path: string, options: RequestInit = {}) {

    const token = localStorage.getItem('token');

    const headers = {
        ...(options.method !== 'DELETE' ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(BASE_URL + API_VERSION + path, {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) throw new Error("API error");
    return res.json();
}
