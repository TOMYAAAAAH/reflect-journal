import Question from "../components/Question.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import AnswerInput from "../components/AnswerInput.tsx";
import {Link} from "react-router-dom";

export default function Day({today}: { today: boolean }) {

    let dayUrl: string;
    if (today) {
        dayUrl = '/today'
    } else {
        dayUrl = '/day/:month/:day'
    }

    const {data: todayData, isLoading: todayLoading, error: todayError} = useQuery({
        queryKey: ['today'],
        queryFn: () => api(dayUrl)
    });


    const {data: indexData, isLoading: indexLoading, error: indexError} = useQuery({
        queryKey: ['health'],
        queryFn: () => api('/health')
    });


    return (
        <>

            <Link to="/profile">Profile</Link>
            <Link to="/year">Year</Link>

            <h1>{today ? 'today' : 'other day'}</h1>

            {todayLoading && <p>Loading...</p>}
            {todayError && <p>Error loading question</p>}
            {todayData && (
                <>
                    <Question question={todayData.question}/>
                    <AnswerInput answers={todayData.answers}/>
                </>
            )}

            <hr/>
            <p>Health :
                {indexLoading && <>Loading...</>}
                {indexError && <>Error loading index</>}
                {indexData && (
                    indexData.message
                )}
            </p>
        </>
    )
}
