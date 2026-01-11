import {describe, it, expect} from "vitest";
import getShiftedDay from "../src/utils/getShiftedDay";
import {Day} from "../src/types/Day";

describe('getShiftedDay', () => {
    it('1/1 -> 10/1', () => {
        const initDay: Day = {month: 1, day: 1};
        const shiftedDay = getShiftedDay(initDay, 10);
        expect(shiftedDay).toEqual({month: 1, day: 11});
    });    it('1/1 -> 10/1', () => {
        const initDay: Day = {month: 5, day: 5};
        const shiftedDay = getShiftedDay(initDay, -20);
        expect(shiftedDay).toEqual({month: 4, day: 15});
    });
    it('31/12 -> 1/1', () => {
        const initDay: Day = {month: 12, day: 31};
        const shiftedDay = getShiftedDay(initDay, 1);
        expect(shiftedDay).toEqual({month: 1, day: 1});
    });
    it('31/12 <- 1/1', () => {
        const initDay: Day = {month: 1, day: 1};
        const shiftedDay = getShiftedDay(initDay, -1);
        expect(shiftedDay).toEqual({month: 12, day: 31});
    });
});