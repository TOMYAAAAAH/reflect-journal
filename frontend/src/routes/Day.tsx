import Question from "../components/Question.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import AnswerInput from "../components/AnswerInput.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {navigateDayUtil} from "../utils/navigateDay.ts";

export default function Day({today}: { today: boolean }) {

    let {month, day} = useParams()
    let dayUrl: string;
    const navigate = useNavigate();

    if (today) {
        dayUrl = 'today'
        const todayDate = new Date();
        month = (todayDate.getMonth() + 1).toString();
        day = todayDate.getDate().toString();
    } else {
        dayUrl = `day/${month}/${day}`
    }

    const {data: questionData, isLoading: questionLoading, error: questionError} = useQuery({
        queryKey: ['question', month, day],
        queryFn: () => api(`/questions/${dayUrl}`),
        staleTime: 1000 * 60 * 60, // cache for 1h
    });

    const {data: answersData, isLoading: answersLoading, error: answersError} = useQuery({
        queryKey: ['answers', month, day],
        queryFn: () => api(`/answers/${dayUrl}`),
        staleTime: 1000 * 60 * 60, // cache for 1h
    });


    const navigateDay = (shift: number) => {
        const {targetMonth, targetDay} = navigateDayUtil(Number(month), Number(day), shift);
        navigate(`/day/${targetMonth}/${targetDay}`);
    }

    return (
        <>

            <Link to="/login"><i className={'pi pi-sign-in'}></i> Login</Link>


            <p>{today ? 'today' : 'other day'}</p>

            <i className={'pi pi-chevron-left'} onClick={() => navigateDay(-1)}></i>
            <i className={'pi pi-chevron-right'} onClick={() => navigateDay(1)}></i>


            {month && day && <>

                {questionLoading && <p>Loading...</p>}
                {questionError && <p>Error loading question</p>}
                {questionData && (
                    <>
                        <Question question={questionData.question}/>
                    </>
                )}

                {answersLoading && <p>Loading...</p>}
                {answersError && <p>Error loading question</p>}
                {answersData && (
                    <>
                        <AnswerInput answers={answersData.answers} questionId={questionData.question.id} month={month}
                                     day={day}/>
                    </>
                )}

            </>

            }

            {/*
            <hr/>
            <p>Health :
                {indexLoading && <>Loading...</>}
                {indexError && <>Error loading index</>}
                {indexData && (
                    indexData.message
                )}
            </p>*/}
        </>
    )
}
