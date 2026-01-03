import {Link} from "react-router-dom";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";

export default function Year() {

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];


    const year = 2026;

    const {data: calendarData, isLoading: calendarLoading, error: calendarError} = useQuery({
        queryKey: ['calendar', year],
        queryFn: () => api(`/calendar/${year}`)
    });

    if (calendarLoading) {<p>Loading...</p>}
    if (calendarError) {<p>Error loading calendar</p>}


    const filledDays: Record<number, number[]> = {1: [1, 10, 31], 3: [10, 11, 12, 13, 14]};

    function isDayFilled(month: number, day: number): boolean {
        return filledDays[month]?.includes(day) || false;
    }

    return (

        <div className={'grid grid-cols-3 gap-6'}>

            {months.map((month) => {
                    const monthName: string = getMonthFromNumber(month);

                    return (

                        <Link to={`/month/${month}`} key={month}>
                            <h2>{monthName}</h2>
                            <div className={'grid grid-cols-7'}>
                                {days.map((day) => {

                                        return (
<>
                                            { isDayFilled(month, day) ?
                                                <div className={'p-1 text-pink-500'} key={day}>
                                                    {day}
                                                </div> :
                                                <div className={'p-1'} key={day}>
                                                    {day}
                                                </div>



                                            }
</>
                                        )
                                    }
                                )}
                            </div>
                        </Link>
                    )
                }
            )}


        </div>
    )
}