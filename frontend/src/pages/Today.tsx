import Question from "../components/Question.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";

export default function Today() {

    const {data: questionData, isLoading: questionLoading, error: questionError} = useQuery({
        queryKey: ['todayQuestion'],
        queryFn: () => api('/questions')
    });

    return (
        <>
            View calendar

            {questionLoading && <p>Loading...</p>}
            {questionError && <p>Error loading question</p>}
            {questionData && questionData.questions.length > 0 && (
                <Question question={questionData.questions[0]}/>
            )}

        </>
    )
}