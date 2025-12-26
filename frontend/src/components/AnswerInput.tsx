import type {Answer} from "../types/answer.type.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import {useState} from "react";

export default function AnswerInput({answers}: { answers: Answer[] }) {


    const [values, setValues] = useState<Record<number, string>>({}) // answer id, answer text

    function sendNewAnswer(answer: Answer) {
        console.log(values[answer.id])

        if (values[answer.id]=='') {
            deleteAnswer.mutate(answer.id)
            return
        }

        saveAnswer.mutate({id: answer.id, answer_text: values[answer.id]})
    }

    const qc = useQueryClient()

    const saveAnswer = useMutation({
        mutationFn: (data: { id: number, answer_text: string }) =>
            api('/answers/' + data.id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({content: data.answer_text}),
            }),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['answers']})
        },
    })

    const deleteAnswer = useMutation({
        mutationFn: ( id: number ) =>
            api('/answers/' + id, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['answers']})
        },
    })


    return (
        <div className={'flex flex-col gap-4'}>

            {answers.map((answer) => (

                <div key={answer.year}>
                    <p>{answer.year}</p>
                    <textarea value={values[answer.id] ?? answer.answer_text}
                              onChange={e =>
                                  setValues(v => ({...v, [answer.id]: e.target.value}))
                              } className={'border border-pink-600 rounded-lg p-2 w-96'}>
                    </textarea>

                    <button onClick={() => sendNewAnswer(answer)}>Modifier</button>

                </div>

            ))}
        </div>
    );
}
