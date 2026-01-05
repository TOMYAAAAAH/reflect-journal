import { Link, Outlet } from "react-router-dom";
import TodayButton from "./components/TodayButton.tsx";
import BackButton from "./components/BackButton.tsx";
import { useDayNavigate } from "./hooks/useDayNavigate.ts";

export default function Layout() {
    const { prevDay, nextDay } = useDayNavigate();

    return (
            <div className={"bg-amber-50 dark:bg-gray-900 h-dvh w-full md:w-3xl dark:text-slate-100 py-16 @container"}>
                <header className={"bg-amber-100 fixed top-0 flex items-center justify-between max-w-3xl w-full my-4 px-4"}>
                    <BackButton />
                    {location.pathname !== "/profile" && (
                        <Link to="/profile">
                            <i className={"pi pi-user text-3xl"}></i>
                        </Link>
                    )}
                </header>
                <main className={"px-4"}>
                    <Outlet />
                </main>
                <footer className={"bg-amber-100 fixed bottom-0 flex items-center justify-between max-w-3xl w-full my-4 px-4"}>
                    <button onClick={prevDay}>
                        <i className={"pi pi-angle-left"}></i>Yesterday
                    </button>
                    <TodayButton />
                    <button onClick={nextDay}>
                        Tomorrow<i className={"pi pi-angle-right"}></i>
                    </button>
                </footer>
            </div>
    );
}