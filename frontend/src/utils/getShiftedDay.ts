import type {Day} from "../types/Day.ts";

export default function getShiftedDay(day: Day, shift: number) {

        const date = new Date();
        date.setMonth(day.month - 1); // JS months are 0-indexed
        date.setDate(day.day);
        date.setDate(date.getDate() + shift); // Adds or subtracts days correctly

        const shiftedDay: Day = {month:  date.getMonth() + 1, day: date.getDate()};

    return shiftedDay
}