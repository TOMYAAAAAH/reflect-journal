const BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION || "/v1";

export async function api(path: string, options: RequestInit = {}) {

    const token = localStorage.getItem('token');

    const headers = {
        ...(options.method !== 'DELETE' ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const url = BASE_URL + API_VERSION + path;

    const res = await fetch(url, {
        ...options,
        headers,
        body: options.body ?? undefined,
    });

    let data: any;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        const err = new Error(data?.message || res.statusText || 'Unknown error') as any;
        err.status = res.status;
        err.statusText = res.statusText;
        err.route = url;
        err.method = options.method;
        err.body = options.body;
        throw err;
    }

    return data;
}
