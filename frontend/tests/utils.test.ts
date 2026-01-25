import {describe, it, expect} from "vitest";
import getShiftedDay from "../src/utils/getShiftedDay";
import {Day} from "../src/types/Day";
import validateDay from "../src/utils/validateDay";

describe('getShiftedDay', () => {
    it('1/1 -> 10/1', () => {
        const initDay: Day = {month: 1, day: 1};
        const shiftedDay = getShiftedDay(initDay, 10);
        expect(shiftedDay).toEqual({month: 1, day: 11});
    });
    it('1/1 -> 10/1', () => {
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

describe('validateDay', () => {
    it('1/1', () => {
        const isDayValid = validateDay({month: 1, day: 1});
        expect(isDayValid).toBeTruthy();
    });
    it('29/2', () => {
        const isDayValid = validateDay({month: 2, day: 29});
        expect(isDayValid).toBeTruthy();
    });
    it('31/12', () => {
        const isDayValid = validateDay({month: 12, day: 31});
        expect(isDayValid).toBeTruthy();
    });
    it('0/1', () => {
        const isDayValid = validateDay({month: 0, day: 1});
        expect(isDayValid).toBeFalsy();
    });
    it('ab/cd', () => {
        const isDayValid = validateDay({month: Number('ab'), day: Number('cd')});
        expect(isDayValid).toBeFalsy();
    });
});
