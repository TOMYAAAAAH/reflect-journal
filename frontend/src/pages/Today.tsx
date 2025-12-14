import Question from "../components/Question.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../api/client.ts";

export default function Today() {

    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;

    const playlistId = 1;

    const {data: questionData, isLoading: questionLoading, error: questionError} = useQuery({
        queryKey: ['todayQuestion'],
        queryFn: () => api(`/questions/date/${todayMonth}/${todayDay}?playlist_id=${playlistId}`)
    });

    return (
        <>
            View calendar

            {questionLoading && <p>Loading...</p>}
            {questionError && <p>Error loading question</p>}
            {questionData && (
                <Question question={questionData.question}/>
            )}

        </>
    )
}