import type {Answer} from "../types/answer.type.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import {useState} from "react";

export default function AnswerInput({answers, questionId}: { answers: Answer[], questionId: number }) {


    const [values, setValues] = useState<Record<number, string>>({}) // answer year, answer text

    function sendNewAnswer(answer: Answer) {
        console.log(values[answer.year])


        if (values[answer.year] == '') {
            deleteAnswer.mutate(answer.year)
            return
        }

        if (answer.isExisting) {
            saveAnswer.mutate({year: answer.year, answer_text: values[answer.year]})
        } else {
            createAnswer.mutate({year: answer.year, answer_text: values[answer.year]})
        }

    }

    const qc = useQueryClient()

    const createAnswer = useMutation({
        mutationFn: (data: { year: number, answer_text: string }) =>
            api(`/answers/question/${questionId}/year/${data.year}`, {
                method: 'POST',
                body: JSON.stringify({content: data.answer_text}),
            }),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['answers']})
        },
    })

    const saveAnswer = useMutation({
        mutationFn: (data: { year: number, answer_text: string }) =>
            api(`/answers/question/${questionId}/year/${data.year}`, {
                method: 'PUT',
                body: JSON.stringify({content: data.answer_text}),
            }),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['answers']})
        },
    })

    const deleteAnswer = useMutation({
        mutationFn: (year: number) =>
            api(`/answers/question/${questionId}/year/${year}`, {
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
                    <textarea value={values[answer.year] ?? answer.answer_text}
                              onChange={e =>
                                  setValues(v => ({...v, [answer.year]: e.target.value}))
                              } className={'border border-pink-600 rounded-lg p-2 w-96'}>
                    </textarea>

                    <button onClick={() => sendNewAnswer(answer)}>Modifier</button>

                </div>

            ))}
        </div>
    );
}
