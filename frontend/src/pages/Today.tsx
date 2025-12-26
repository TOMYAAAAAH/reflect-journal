import Question from "../components/Question.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import AnswerInput from "../components/AnswerInput.tsx";

export default function Today() {


    const {data: todayData, isLoading: todayLoading, error: todayError} = useQuery({
        queryKey: ['today'],
        queryFn: () => api(`/today`)
    });

    return (
        <>

            {todayLoading && <p>Loading...</p>}
            {todayError && <p>Error loading question</p>}
            {todayData && (
                <>
                <Question question={todayData.question}/>
                <AnswerInput answers={todayData.answers}/>
                </>
            )}

        </>
    )
}