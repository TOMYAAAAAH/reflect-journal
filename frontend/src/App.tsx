import './App.css'
import {useQuery} from "@tanstack/react-query";
import {api} from "./api/client.ts";


function App() {


    const { data: questionData, isLoading: questionLoading, error: questionError } = useQuery({
        queryKey: ['todayQuestion'],
        queryFn: () => api('/questions')
    });

    const { data: indexData, isLoading: indexLoading, error: indexError } = useQuery({
        queryKey: ['index'],
        queryFn: () => api('/')
    });


  return (
    <>
      <h1>Reflect journal</h1>
        {questionLoading && <p>Loading...</p>}
        {questionError && <p>Error loading question</p>}
        {questionData && questionData.questions.length > 0 && (
            <div>
                <h2>Today's Question:</h2>
                <p>{questionData.questions[0].question_text}</p>
            </div>
        )}

        <br/>
        {indexLoading && <p>Loading...</p>}
        {indexError && <p>Error loading index</p>}
        {indexData && (
            <div>
                <h2>Index</h2>
                <p>{indexData.message}</p>
            </div>
        )}
    </>
  )
}

export default App
