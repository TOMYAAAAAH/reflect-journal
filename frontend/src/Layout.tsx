import {Outlet, useMatch} from "react-router-dom";
import BackButton from "./components/BackButton.tsx";
import IconButton from "./components/buttons/IconButton.tsx";
import Footer from "./components/Footer.tsx";
import {useAuth} from "./hooks/useAuth.ts";

export default function Layout() {

    const isIndex = !!useMatch("/");
    const isDay = !!useMatch("/day/:month/:day");

    const pathIsDay = isIndex || isDay;

    const { isAuthenticated, isLoading } = useAuth()

    return (
        <div className={"bg-amber-50 dark:bg-gray-900 w-full md:w-2xl dark:text-slate-100"}>
            <header className={"bg-amber-100/10 fixed top-0 flex items-center justify-between max-w-2xl w-full my-4 px-4"}>
                <BackButton/>
                {pathIsDay && (
                    <IconButton url={'/profile'} icon={'cog'}/>
                )}
            </header>
            <main className={"px-4 pt-16 pb-20"}>
                <Outlet/>
            </main>
            <Footer pathIsDay={pathIsDay}/>

            <i className={'absolute pi left-0 top-0 pi-link ' + `${isAuthenticated ? 'text-green-500' : 'text-red-500'}`}></i>
            <i className={'absolute pi left-6 top-0 pi-spinner-dotted ' + `${isLoading ? 'text-green-500' : 'text-red-500'}`}></i>

        </div>
    );
}