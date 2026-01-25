import {Link, useNavigate} from "react-router-dom";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import type {Calendar} from "../types/Calendar.ts";
import listAllDays from "../utils/listAllDays.ts";
import {useState} from "react";

export default function Year() {

    const allDays = listAllDays();
    const navigate = useNavigate();

    const year = 2026;

    const fetchCalendar = (): Promise<Calendar> => {
        return api(`/calendar/${year}`)
    }

    const {data} = useQuery({
        queryKey: ['calendar', year],
        queryFn: fetchCalendar
    });

    function isDayFilled(month: number, day: number): boolean {
        return data?.dates[month]?.includes(day) || false;
    }


    function navigateToMonth(month: number) {

        document.startViewTransition(() => {
            setIsYearMode(false);
            navigate(`/year#${month}`);

        })

    setTimeout(() => {
        document.getElementById(month.toString())?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, 50);
    }



    function navigateToYear() {
        document.startViewTransition(() => {
            setIsYearMode(true);
            navigate(`/year`);
        });
    }

    const [isYearMode, setIsYearMode] = useState<boolean>(true);

    return (
        <div data-theme={isYearMode ? '' : 'month'} className={'scroll-smooth'}>
            <button className={'p-5 bg-amber-800 sticky top-16 z-10'} onClick={navigateToYear}>to year</button>

            <div className={'flex flex-wrap gap-x-3 gap-y-6 justify-center'}>


                {/*allDays.map((month) => {
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
            )*/}

                {allDays.map((month) => {
                        const monthNb = allDays.indexOf(month) + 1;
                        const monthName: string = getMonthFromNumber(monthNb);

                        return (

                            <div
                                style={{viewTransitionName: `monthName-${monthNb}`}}
                                onClick={() => isYearMode && navigateToMonth(monthNb)} key={monthNb}
                                className={'w-3/10 month:w-full '}>

                                <h2
                                    className={'text-left text-2xl pl-1 month:text-2xl font-medium pb-2'}>{monthName.slice(0, isYearMode ? 3 : 20)}</h2>

                                <div
                                    className={'grid grid-cols-7 justify-items-center gap-y-1 month:gap-y-5 '}
                                    id={monthNb.toString()}>
                                    {month.map((day) => {

                                            return (
                                                <Link
                                                    className={`text-[0.6rem] month:text-2xl font-medium ${isDayFilled(monthNb, day) && 'text-pink-500'} `}
                                                    key={day}
                                                    to={!isYearMode ? `/day/${monthNb}/${day}` : ''}>
                                                    {day}
                                                </Link>

                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        )
                    }
                )}


            </div>
        </div>
    )
}

/*
*
* transition-[width] duration-500 transform-gpu will-change-[width] ease-[steps(20)]*/