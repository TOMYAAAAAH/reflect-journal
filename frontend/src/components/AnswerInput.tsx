import type {Answer} from "../types/Answer.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import {useState} from "react";

export default function AnswerInput({answers, questionId, month, day}: {
    answers: Answer[],
    questionId: number,
    month: string,
    day: string
}) {


    const [values, setValues] = useState<Record<number, string>>({}) // answer year, answer text

    function sendNewAnswer(answer: Answer) {

        console.log(values[answer.year], answer.answer_text)


        if (values[answer.year] === answer.answer_text || !values[answer.year]) {
            console.log('no change')
            return
        }

        if (values[answer.year] === '') {
            console.log('delete')
            deleteAnswer.mutate({year: answer.year})
            return
        }

        if (answer.isExisting) {
            console.log('put')
            saveAnswer.mutate({year: answer.year, answer_text: values[answer.year]})
        } else {
            console.log('post')
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
            qc.invalidateQueries({queryKey: ['answers', month, day]})
        },
    })

    const saveAnswer = useMutation({
        mutationFn: (data: { year: number, answer_text: string }) =>
            api(`/answers/question/${questionId}/year/${data.year}`, {
                method: 'PUT',
                body: JSON.stringify({content: data.answer_text}),
            }),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['answers', month, day]})
        },
    })

    const deleteAnswer = useMutation({
        mutationFn: (data: { year: number }) =>
            api(`/answers/question/${questionId}/year/${data.year}`, {
                method: 'DELETE',
            }),
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ['answers', month, day]})
        },
    })

    return (
        <div className={'flex flex-col gap-4'}>

            {answers.map((answer: Answer) => (

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
