import type {Answer} from "../types/answer.type.ts";

export default function AnswerInput({answers}: { answers: Answer[] }) {

    function sendNewAnswer(answer: Answer){
        console.log(answer.year);
    }

    return (
        <div className={'flex flex-col gap-4'}>

            {answers.map((answer) => (

                    <div key={answer.year}>
                        <p>{answer.year}</p>
                        <textarea defaultValue={answer.answer_text} className={'border border-pink-600 rounded-lg p-2 w-96'}></textarea>
                        <button onClick={() => sendNewAnswer(answer)}>Modifier</button>

                    </div>

            ))}
        </div>
    );
}
