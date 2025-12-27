export function navigateDayUtil(month: number, day: number, shift: number) {

    const date = new Date(); // today

    date.setMonth(month - 1); // set input date
    date.setDate(day + shift)

    return {targetMonth: date.getMonth() + 1, targetDay: date.getDate()}
}