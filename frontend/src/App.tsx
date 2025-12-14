import './App.css'
import {useQuery} from "@tanstack/react-query";
import {api} from "./api/client.ts";
import Today from "./pages/Today.tsx";


function App() {


    const {data: indexData, isLoading: indexLoading, error: indexError} = useQuery({
        queryKey: ['health'],
        queryFn: () => api('/health')
    });


    return (
        <>

            <Today/>

            <hr/>
            <p>Health :
                {indexLoading && <p>Loading...</p>}
                {indexError && <p>Error loading index</p>}
                {indexData && (
                    indexData.message
                )}
            </p>
        </>
    )
}

export default App
