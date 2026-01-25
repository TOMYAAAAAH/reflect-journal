import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import type {User} from "../types/User.ts";

type UserDto = {
    user: User
}

async function fetchMe(): Promise<UserDto | null> {
    try {
        return await api("/me");
    } catch {
        return null; // if not logged in or error
    }
}

export function useAuth() {
    const token = typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    const hasToken = !!token;

    const query = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        staleTime: 5 * 60 * 1000, // cache for 5 min
        refetchOnWindowFocus: false,
        retry: false, // don’t retry if 401
        enabled: hasToken, // hook always runs, query only runs if token exists
    });

    return {isAuthenticated: !!query.data, isLoading: query.isLoading}

}
