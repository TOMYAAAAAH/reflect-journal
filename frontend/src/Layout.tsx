import {Link, Outlet, useLocation} from "react-router-dom";
import TodayButton from "./components/TodayButton.tsx";

export default function Layout() {

    const location = useLocation();




    return (
        <body className={'bg-amber-50 dark:bg-gray-900'}>
        <header className={'fixed top-0 right-0'}>
            {location.pathname !== "/profile" &&
                <Link to="/profile"><i className={'pi pi-user text-3xl'}></i></Link>}
        </header>
        <main>
            <Outlet/>
        </main>
        <footer className={'fixed bottom-0 left-0'}>
            <TodayButton/>
        </footer>
        </body>
    );
}
