import './App.css'
import {useQuery} from "@tanstack/react-query";
import {api} from "./api/client.ts";
import Today from "./pages/Today.tsx";


function App() {


    const { data: indexData, isLoading: indexLoading, error: indexError } = useQuery({
        queryKey: ['index'],
        queryFn: () => api('/')
    });


  return (
    <>

        <Today/>

        <hr/>
      <h1>Reflect journal</h1>


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
