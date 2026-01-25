import Question from "../components/Question.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import AnswerInput from "../components/AnswerInput.tsx";
import {useParams} from "react-router-dom";
import {useDayContext} from "../hooks/useDayContext.ts";
import {useEffect} from "react";
import AnswerConnect from "../components/AnswerConnect.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import validateDay from "../utils/validateDay.ts";
import type {Day} from "../types/Day.ts";

export default function Day({today}: { today: boolean }) {

    const STALE_TIME = 1000 * 60 * 60;

    const {paramMonth, paramDay} = useParams()
    const {setCurrentDay, currentDay} = useDayContext();

    useEffect(() => {

        let targetDay: Day;

        if (today) {
            const now = new Date();
            targetDay = {
                month: now.getMonth() + 1,
                day: now.getDate(),
            };
        } else {
            targetDay = {
                month: Number(paramMonth),
                day: Number(paramDay),
            };
        }

        // If different day and valid day
        if (
            (currentDay.month !== targetDay.month ||
            currentDay.day !== targetDay.day) &&
            validateDay(targetDay)
        ) {
            setCurrentDay(targetDay);
        }

    }, [today, paramMonth, paramDay, currentDay, setCurrentDay]);

    let day: Day;

    if (today) {
        const now = new Date();
        day = {
            month: now.getMonth() + 1,
            day: now.getDate(),
        };
    } else {
        day = {
            month: currentDay.month,
            day: currentDay.day,
        };
    }

    const dayUrl = `day/${day.month}/${day.day}`
    const isUrlValid = validateDay(day);
    const {isAuthenticated, isLoading} = useAuth()

    const {data: questionData, isLoading: questionIsLoading, error: questionError} = useQuery({
        queryKey: ['question', day.month, day.day],
        queryFn: () => api(`/questions/${dayUrl}`),
        enabled: isUrlValid,
        staleTime: STALE_TIME
    });

    const {data: answersData, isLoading: answersIsLoading, error: answersError} = useQuery({
        queryKey: ['answers', day.month, day.day],
        queryFn: () => api(`/answers/${dayUrl}`),
        enabled: isUrlValid && isAuthenticated,
        staleTime: STALE_TIME
    });

    return (
        <div className={'flex flex-col gap-1'}>

            {isUrlValid ? <>

                    <Question question={questionData ? questionData.question : undefined}
                              day={day}
                              isLoading={questionIsLoading}
                              error={questionError}/>

                    {answersIsLoading && <p>Loading...</p>}
                    {answersError && <p>Error loading answers</p>}
                    {answersData && (
                        <>
                            <AnswerInput answers={answersData.answers}
                                         questionId={questionData.question.id}
                                         month={day.month}
                                         day={day.day}/>
                        </>
                    )}

                </>

                :
                <>
                    woopsie, wrong day
                </>
            }
            {!isAuthenticated && !isLoading &&
                <AnswerConnect/>}

        </div>
    )
}
