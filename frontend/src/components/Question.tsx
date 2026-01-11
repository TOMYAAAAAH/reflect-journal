import type {Question} from "../types/Question.ts";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";

export default function Question({question}: { question: Question }) {
    return (
        <div className={'flex items-center gap-6 py-6'}>
            <div className={'flex flex-col items-center'}>
                <p className={'text-lg'}> {getMonthFromNumber(question.month)}</p>
                <p className={'text-8xl font-bold'}>{question.day} </p>
            </div>
            <p className={'text-lg text-center grow'}>{question.question_text}</p>
        </div>
    );
}
