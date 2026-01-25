import type {Question} from "../types/Question.ts";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";
import type {Day} from "../types/Day.ts";

export default function Question({question, day, isLoading, error}: { question: Question | undefined, day: Day, isLoading: boolean, error: Error | null }) {
    return (
        <div className={'flex items-center gap-6 py-6'}>
            <div className={'flex flex-col items-center'}>
                <p className={'text-lg'}> {getMonthFromNumber(day.month)}</p>
                <p className={'text-8xl font-bold'}>{day.day} </p>
            </div>

            <p className={'text-lg text-center grow'}>

            {isLoading && "Loading..."}
            {error && "Error loading question"}
            {question && question.question_text}

            </p>
        </div>
    );
}
