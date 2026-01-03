import {Link, Outlet, useLocation} from "react-router-dom";
import TodayButton from "./components/TodayButton.tsx";
import BackButton from "./components/BackButton.tsx";

export default function Layout() {

    const location = useLocation();


    return (
        <div className={'bg-amber-50 dark:bg-gray-900 w-screen md:w-3xl dark:text-slate-100 px-4 py-16'}>
            <header className={'fixed flex items-center justify-center w-[calc(100%-32px)]'}>
                <BackButton />
                {location.pathname !== "/profile" &&
                    <Link to="/profile"><i className={'pi pi-user text-3xl'}></i></Link>}
            </header>
            <main>
                <Outlet/>
            </main>
            <footer className={'fixed flex items-center justify-center w-[calc(100%-32px)]'}>
                <Link to="/day/1/2"><i className={'pi pi-angle-left'}></i>Yesterday</Link>
                <TodayButton/>
                <Link to="/day/1/4">Tomorrow<i className={'pi pi-angle-right'}></i></Link>

            </footer>
        </div>
    );
}
