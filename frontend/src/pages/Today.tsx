import Question from "../components/Question.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";
import AnswerInput from "../components/AnswerInput.tsx";

export default function Today() {

    const playlistId = 1;

    const {data: questionData, isLoading: questionLoading, error: questionError} = useQuery({
        queryKey: ['todayQuestion'],
        queryFn: () => api(`/questions/today?playlist_id=${playlistId}`)
    });

    const {data: answerData, isLoading: answerLoading, error: answerError} = useQuery({
        queryKey: ['todayAnswers'],
        queryFn: () => api(`/answers/question/23`)
    });

    return (
        <>

            {questionLoading && <p>Loading...</p>}
            {questionError && <p>Error loading question</p>}
            {questionData && (
                <Question question={questionData.question}/>
            )}

            {answerLoading && <p>Loading...</p>}
            {answerError && <p>Error loading question</p>}
            {answerData && (
                <AnswerInput answers={answerData.answers}/>
            )}

        </>
    )
}