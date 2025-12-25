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
                {indexLoading && <>Loading...</>}
                {indexError && <>Error loading index</>}
                {indexData && (
                    indexData.message
                )}
            </p>
        </>
    )
}

export default App
