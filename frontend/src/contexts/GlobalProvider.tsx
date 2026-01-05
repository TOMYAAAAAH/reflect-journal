import { DayContext } from "./DayContext.ts";
import {type ReactNode, useState} from "react";
import type {Day} from "../types/Day.ts";


export function DayProvider({ children }: { children: ReactNode }) {
    const today = new Date();
    const [currentDay, setCurrentDay] = useState<Day>({
        month: today.getMonth() + 1,
        day: today.getDate(),
    });

    return (
        <DayContext.Provider value={{ currentDay, setCurrentDay }}>
            {children}
        </DayContext.Provider>
    );
}
