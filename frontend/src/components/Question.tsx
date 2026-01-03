import type {Question} from "../types/Question.ts";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";

export default function Question({question}: { question: Question }) {
    return (
        <div>
            <h3 className={'text-2xl font-bold'}>{question.day} {getMonthFromNumber(question.month)}</h3>
            <p>{question.question_text}</p>
        </div>
    );
}
