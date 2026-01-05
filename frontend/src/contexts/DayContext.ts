import { createContext } from "react";
import type { Day } from "../types/Day.ts";

type DayContextType = {
    currentDay: Day;
    setCurrentDay: React.Dispatch<React.SetStateAction<Day>>;
};

// Create the DayContext with a default value of undefined
export const DayContext = createContext<DayContextType | undefined>(undefined);

