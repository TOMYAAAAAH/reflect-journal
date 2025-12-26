import {Link} from "react-router-dom";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";

export default function Year() {

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

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

                                            <div className={'p-1'} key={day}>
                                                {day}
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