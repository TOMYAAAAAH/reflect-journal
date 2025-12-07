const BASE_URL = "http://localhost:3000";

export async function api(path: string, options = {}) {
    const res = await fetch(BASE_URL + path, {
        headers: { "Content-Type": "application/json" },
        ...options
    });

    if (!res.ok) throw new Error("API error");
    return res.json();
}
