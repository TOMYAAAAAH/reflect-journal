import Question from "../components/Question.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import AnswerInput from "../components/AnswerInput.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {navigateDayUtil} from "../utils/navigateDay.ts";

export default function Day({today}: { today: boolean }) {

    let {month, day} = useParams()
    let dayUrl: string;

    if (today) {
        dayUrl = '/today'
        const todayDate = new Date();
        month = (todayDate.getMonth()+1).toString();
        day = todayDate.getDate().toString();
    } else {
        dayUrl = `/day/${month}/${day}`
    }

    const navigate = useNavigate();

    const {data: todayData, isLoading: todayLoading, error: todayError} = useQuery({
        queryKey: ['day', month, day],
        queryFn: () => api(dayUrl)
    });

/*
    const {data: indexData, isLoading: indexLoading, error: indexError} = useQuery({
        queryKey: ['health'],
        queryFn: () => api('/health')
    });
*/
    const navigateDay = (shift: number) => {
        const {targetMonth, targetDay} = navigateDayUtil(Number(month), Number(day), shift);
        navigate(`/day/${targetMonth}/${targetDay}`);
    }

    return (
        <>

            <div className={'flex flex-col gap-4 justify-center text-2xl p-8'}>
                <Link to="/profile"><i className={'pi pi-user'}></i> Profile</Link>
                <Link to="/year"><i className={'pi pi-calendar'}></i> Year</Link>
                <Link to="/"><i className={'pi pi-sun'}></i> Today</Link>
                <Link to="/login"><i className={'pi pi-sign-in'}></i> Login</Link>
            </div>


            <p>{today ? 'today' : 'other day'}</p>

            <i className={'pi pi-chevron-left'} onClick={() => navigateDay(-1)}></i>
            <i className={'pi pi-chevron-right'} onClick={() => navigateDay(1)}></i>

            {todayLoading && <p>Loading...</p>}
            {todayError && <p>Error loading question</p>}
            {todayData && (
                <>
                    <Question question={todayData.question}/>
                    <AnswerInput answers={todayData.answerDto} questionId={todayData.question.id}/>
                </>
            )}
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
