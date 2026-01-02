import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { PostHogProvider } from 'posthog-js/react'

import Day from './routes/Day.tsx'
import Profile from './routes/Profile.tsx'
import Year from './routes/Year.tsx'
import Month from './routes/Month.jsx'
import Login from './routes/Login.tsx'
import Register from './routes/Register.tsx'
import NotFound from "./routes/NotFound.tsx";

const queryClient = new QueryClient();

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__:
            import("@tanstack/query-core").QueryClient;
    }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

const router = createBrowserRouter([
    {path: "/", element: <Day today={true}/>},
    {path: "/day/:month/:day", element: <Day today={false}/>},
    {path: "/year", element: <Year/>},
    {path: "/month/:targetMonth?", element: <Month/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
    {path: "/profile", element: <Profile/>},
    {path: "*", element: <NotFound/>},
]);

const options = {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: '2025-11-30',
} as const

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </PostHogProvider>
    </StrictMode>,
)
