import { useNavigate } from "react-router-dom";
import {useDayContext} from "./useDayContext.ts";
import getShiftedDay from "../utils/getShiftedDay.ts";

export function useDayNavigate() {
    const navigate = useNavigate();
    const { currentDay } = useDayContext();

    const navigateDay = (shift: number) => {

        const targetDay = getShiftedDay(currentDay, shift);
        navigate(`/day/${targetDay.month}/${targetDay.day}`);
    };

    return {
        prevDay: () => navigateDay(-1),
        nextDay: () => navigateDay(1),
    };
}