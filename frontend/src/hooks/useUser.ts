import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
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

export function useUser() {
    return useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        staleTime: 60 * 60 * 1000, // cache for 60 min
        refetchOnWindowFocus: false,
        retry: false, // don’t retry if 401
    });
}
