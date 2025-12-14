import type {Question} from "../types/question.type.ts";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";

export default function Question({question}: { question: Question }) {
    return (
        <div>
            <h2>Today's Question:</h2>
            <h3>{question.day} {getMonthFromNumber(question.month)}</h3>
            <p>{question.question_text}</p>
        </div>
    );
}
