import type {Answer} from "../types/Answer.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import {useEffect, useRef, useState} from "react";
import posthog from "posthog-js";

export default function AnswerInput({answers, questionId, month, day}: {
    answers: Answer[],
    questionId: number,
    month: string,
    day: string
}) {

    const DEBOUNCE_MS = 5000;

    const [answerTextByYear, setAnswerTextByYear] = useState<Record<number, string>>({})
    const [isSavingByYear, setIsSavingByYear] = useState<Record<number, boolean>>({})
    const [isErrorByYear, setIsErrorByYear] = useState<Record<number, boolean>>({})

    useEffect(() => {
        setAnswerTextByYear(Object.fromEntries(answers.map(a => [a.year, a.answer_text])));
    }, [answers]);

    const autoResize = (element: HTMLTextAreaElement | null) => {
        if (!element) return
        if (element.value === "") element.style.height = '0px'; // hide if empty
        else {
            element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';
        }
    }

    function handleChange(answer: Answer, newText: string) {
        setAnswerTextByYear(v => ({...v, [answer.year]: newText}))
        debounceSave(answer, newText)
    }

    function handleBlur(answer: Answer) {
        const newText = answerTextByYear[answer.year];
        debounceSave(answer, newText, 1)
    }
    const timers = useRef<Record<number, number>>({})

    function debounceSave(answer: Answer, newText: string, delay: number = DEBOUNCE_MS) {

        setIsSavingByYear(v => ({...v, [answer.year]: true}))
        clearTimeout(timers.current[answer.year])

        timers.current[answer.year] = setTimeout(() => {

            saveNewAnswer(answer, newText)
            delete timers.current[answer.year]

        }, delay)
    }


    function saveNewAnswer(answer: Answer, newText: string) {

        if (newText === answer.answer_text) { // same as before
            setIsSavingByYear(v => ({...v, [answer.year]: false}))
            return
        }

        if (newText === '') { // deletion
            deleteAnswer.mutate({year: answer.year})
            return
        }

        if (!newText) { // value not inited
            setIsSavingByYear(v => ({...v, [answer.year]: false}))
            return
        }

        if (answer.isExisting) {
            saveAnswer.mutate({year: answer.year, answer_text: newText})
        } else {
            createAnswer.mutate({year: answer.year, answer_text: newText})
        }
    }


    const createAnswer = useMutation({
        mutationFn: (data: { year: number, answer_text: string }) =>
            api(`/answers/question/${questionId}/year/${data.year}`, {
                method: 'POST',
                body: JSON.stringify({content: data.answer_text}),
            }),
        onSuccess: (_data, data) => {
            apiSuccess(data.year, "POST")
        },
        onError: (_data, data) => {
            apiError(data.year, _data)
        }
    })

    const saveAnswer = useMutation({
        mutationFn: (data: { year: number, answer_text: string }) =>
            api(`/answers/question/${questionId}/year/${data.year}`, {
                method: 'PUT',
                body: JSON.stringify({content: data.answer_text}),
            }),
        onSuccess: (_data, data) => {
            apiSuccess(data.year, "PUT")
        },
        onError: (_data, data) => {
            apiError(data.year, _data)
        }
    })

    const deleteAnswer = useMutation({
        mutationFn: (data: { year: number }) =>
            api(`/answers/question/${questionId}/year/${data.year}`, {
                method: 'DELETE',
            }),
        onSuccess: (_data, data) => {
            apiSuccess(data.year, "DELETE")
        },
        onError: (_data, data) => {
            apiError(data.year, _data)
        }
    })

    const qc = useQueryClient()

    function apiSuccess(year: number, method: string) {
        qc.invalidateQueries({queryKey: ['answers', month, day]})
        setIsSavingByYear(v => ({...v, [year]: false}))
        setIsErrorByYear(v => ({...v, [year]: false}))
        posthog.capture('my event', {year: year, month: month, day: day, method: method})
    }

    function apiError(year: number, error: Error) {
        setIsErrorByYear(v => ({...v, [year]: true}))
        console.error(error)
    }

    return (
        <div className={'flex flex-col gap-4'}>

            {answers.map((answer: Answer) => (

                <label key={answer.year}
                       className={'flex flex-col p-3 items-start rounded-lg bg-pink-50 dark:bg-pink-950/40 ' +
                           'focus-within:ring-2 focus-within:ring-pink-500  ' +
                           `${answerTextByYear[answer.year] && "gap-2"}`}
                >
                    <p className={'flex gap-1 items-center'}>{answer.year}

                        {isErrorByYear[answer.year] ?
                            <i className={'text-xs pi pi-exclamation-triangle'}></i> :

                            isSavingByYear[answer.year] ?
                                <i className={'text-xs pi pi-sync'}></i> :
                                <i className={'text-xs pi pi-check animate-temporary-confirm-check opacity-0'}></i>

                        }

                    </p>
                    <textarea value={answerTextByYear[answer.year] ?? answer.answer_text}
                              onChange={e => handleChange(answer, e.target.value)}
                              onBlur={() => handleBlur(answer)}
                              ref={autoResize}
                              className={'w-full h-16 focus:outline-none resize-none'}
                              rows={1}

                    >
                    </textarea>

                </label>

            ))}
        </div>
    );
}
