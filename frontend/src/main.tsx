import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Day from './routes/Day.tsx'
import Profile from './routes/Profile.tsx'
import Year from './routes/Year.tsx'
import Month from './routes/Month.jsx'
import Login from './routes/Login.tsx'
import Register from './routes/Register.tsx'

const queryClient = new QueryClient();

const router = createBrowserRouter([
    { path: "/", element: <Day today={true} /> },
    { path: "/day/:month/:day", element: <Day today={false}/> },
    { path: "/year", element: <Year /> },
    { path: "/month/:targetMonth?", element: <Month /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/profile", element: <Profile /> },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </StrictMode>,
)
