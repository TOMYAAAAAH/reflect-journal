import {Link} from "react-router-dom";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import type {Calendar} from "../types/Calendar.ts";
import listAllDays from "../utils/listAllDays.ts";

export default function Year() {

    const allDays = listAllDays();

    const year = 2026;

    const fetchCalendar = (): Promise<Calendar> => {
        return api(`/calendar/${year}`)
    }

    const {data, error} = useQuery({
        queryKey: ['calendar', year],
        queryFn: fetchCalendar
    });

    function isDayFilled(month: number, day: number): boolean {
        return data?.dates[month]?.includes(day) || false;
    }

    if (error) return <div>error</div>;

    return (

        <div className={'grid grid-cols-3 gap-6'}>


            {allDays.map((month) => {
                    const monthNb = allDays.indexOf(month) + 1;
                    const monthName: string = getMonthFromNumber(monthNb);

                    return (
                        <p key={monthNb}>
                            <span className={'text-sm'}>{monthName}</span>
                            <span className={'text-pink-500 font-bold pl-2'}>{data?.stats[monthNb]}</span>
                            <span className={'text-sm pl-2'}>/ 31</span>
                        </p>
                    )
                }
            )}

            {allDays.map((month) => {
                const monthNb = allDays.indexOf(month) + 1;
                const monthName: string = getMonthFromNumber(monthNb);

                    return (

                        <Link to={`/month/${monthNb}`} key={monthNb}>
                            <h2>{monthName}</h2>
                            <div className={'grid grid-cols-7'}>
                                {month.map((day) => {

                                        return (
                                            <div key={day}>
                                                {isDayFilled(monthNb, day) ?
                                                    <div className={'p-1 text-pink-500'} key={day}>
                                                        {day}
                                                    </div> :
                                                    <div className={'p-1'} key={day}>
                                                        {day}
                                                    </div>


                                                }
                                            </div>
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