import {useContext} from "react";
import {DayContext} from "../contexts/DayContext.ts";

export function useDayContext() {
    const context = useContext(DayContext);
    if (!context) {
        throw new Error("useDayContext must be used within a DayProvider.");
    }
    return context;
}