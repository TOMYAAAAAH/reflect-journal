import './App.css'
import {useQuery} from "@tanstack/react-query";
import {api} from "./api/client.ts";


function App() {


    const { data, isLoading, error } = useQuery({
        queryKey: ['todayQuestion'],
        queryFn: () => api('/questions')
    });


  return (
    <>
      <h1>Reflect journal</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading question</p>}
        {data && data.questions.length > 0 && (
            <div>
                <h2>Today's Question:</h2>
                <p>{data.questions[0].question_text}</p>
            </div>
        )}
    </>
  )
}

export default App
