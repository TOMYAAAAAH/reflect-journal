import type {Day} from "../types/Day.ts";

export default function validateDay(day: Day): boolean {
    if (!Number.isInteger(day.month) || day.month < 1 || day.month > 12) {
        return false;
    }

    if (!Number.isInteger(day.day) || day.day < 1) {
        return false;
    }

    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maxDay = daysInMonth[day.month - 1];

    return day.day <= maxDay;
}