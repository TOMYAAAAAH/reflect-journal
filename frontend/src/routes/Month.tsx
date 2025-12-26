import {Link} from "react-router-dom";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

export default function Month() {

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    const { targetMonth } = useParams();

    useEffect(() => {
        document.getElementById(targetMonth!)?.scrollIntoView();
        console.log(targetMonth)
    }, [targetMonth]);


    return (
        <div className={'flex flex-col gap-16'}>
            <Link to={'/year'}>Year</Link>

            {months.map((month) => {
                    const monthName: string = getMonthFromNumber(month);

                    return (

                        <div key={month}>
                            <h2 className={'text-4xl'} id={month.toString()}>{monthName}</h2>
                            <div className={'grid grid-cols-7 gap-4'}>
                            {days.map((day) => {

                                    return (<Link to={`/day/${month}/${day}`} key={day}>

                                        <div className={'p-4 text-2xl'}>
                                            {day}
                                        </div>

                                    </Link>)
                                }
                            )}
                            </div>
                        </div>
                    )
                }
            )}


        </div>
    )
}