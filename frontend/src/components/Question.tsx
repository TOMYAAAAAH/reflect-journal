import type {Question} from "../types/question.type.ts";

export default function Question({question}: { question: Question }) {
    return (
        <div>
            <h2>Today's Question:</h2>
            <h3>{question.day} of the {question.month}th month</h3>
            <p>{question.question_text}</p>
        </div>
    );
}
