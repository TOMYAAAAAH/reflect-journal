import { useNavigate } from "react-router-dom";
import {useDayContext} from "./useDayContext.ts";

export function useDayNavigate() {
    const navigate = useNavigate();
    const { currentDay } = useDayContext();

    const navigateDay = (shift: number) => {
        // Create a Date object starting from the current day and month
        const date = new Date();
        date.setMonth(currentDay.month - 1); // JS months are 0-indexed
        date.setDate(currentDay.day);
        date.setDate(date.getDate() + shift); // Adds or subtracts days correctly

        // Extract the resulting day and month
        const targetMonth = date.getMonth() + 1; // Month is zero-indexed
        const targetDay = date.getDate();

        // Update the route and the state
        navigate(`/day/${targetMonth}/${targetDay}`);
    };

    return {
        prevDay: () => navigateDay(-1),
        nextDay: () => navigateDay(1),
    };
}