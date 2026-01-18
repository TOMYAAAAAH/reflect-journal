import Question from "../components/Question.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import AnswerInput from "../components/AnswerInput.tsx";
import {useParams} from "react-router-dom";
import {useDayContext} from "../hooks/useDayContext.ts";
import {useEffect} from "react";
import AnswerConnect from "../components/AnswerConnect.tsx";
import {useAuth} from "../hooks/useAuth.ts";

export default function Day({today}: { today: boolean }) {

    const STALE_TIME = 1000 * 60 * 60;

    let {month, day} = useParams()
    let dayUrl: string;

    if (today) {
        dayUrl = 'today'
        const todayDate = new Date();
        month = (todayDate.getMonth() + 1).toString();
        day = todayDate.getDate().toString();
    } else {
        dayUrl = `day/${month}/${day}`
    }

    const { setCurrentDay, currentDay } = useDayContext();

    useEffect(() => {
        if (
            currentDay.month === Number(month) &&
            currentDay.day === Number(day)
        ) return;

        setCurrentDay({ month: Number(month), day: Number(day) });
    }, [month, day, currentDay, setCurrentDay]);

    const {data: questionData, isLoading: questionLoading, error: questionError} = useQuery({
        queryKey: ['question', month, day],
        queryFn: () => api(`/questions/${dayUrl}`),
        staleTime: STALE_TIME
    });

    const {data: answersData, isLoading: answersLoading, error: answersError} = useQuery({
        queryKey: ['answers', month, day],
        queryFn: () => api(`/answers/${dayUrl}`),
        staleTime: STALE_TIME
    });

    const { isAuthenticated, isLoading } = useAuth()


    return (
        <div className={'flex flex-col gap-1'}>

            {month && day && <>

                {questionLoading && <p>Loading...</p>}
                {questionError && <p>Error loading question</p>}
                {questionData && (
                    <>
                        <Question question={questionData.question}/>
                    </>
                )}

                {answersLoading && <p>Loading...</p>}
                {answersError && <p>Error loading answers</p>}
                {answersData && (
                    <>
                        <AnswerInput answers={answersData.answers} questionId={questionData.question.id} month={month}
                                     day={day}/>
                    </>
                )}

            </>
            }
            { !isAuthenticated && !isLoading &&
                <AnswerConnect/>}

        </div>
    )
}
