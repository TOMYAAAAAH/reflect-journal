import {Outlet, useMatch, useNavigate} from "react-router-dom";
import BackButton from "./components/BackButton.tsx";
import IconButton from "./components/buttons/IconButton.tsx";
import Footer from "./components/Footer.tsx";
import {useAuth} from "./hooks/useAuth.ts";
import {useEffect} from "react";

export default function Layout() {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('visited')) {
            console.log('welcom');
            navigate('/welcome');
            window.localStorage.setItem('visited', 'true');
        }
    }, [navigate]);

    const isIndex = !!useMatch("/");
    const isDay = !!useMatch("/day/:month/:day");

    const isRegister = !!useMatch("/register");
    const isLogin = !!useMatch("/login");
    const isWelcome = !!useMatch("/welcome");

    const showDayUi = isIndex || isDay;
    const showTodayButton = !(isRegister || isLogin || isWelcome);

    const {isAuthenticated, isLoading} = useAuth()

    return (
        <div className={"bg-amber-50 dark:bg-gray-900 w-full min-h-dvh md:w-xl dark:text-slate-100"}>
            <header
                className={"bg-amber-100/10 fixed top-0 flex items-center justify-between max-w-xl w-full my-4 px-4"}>
                <BackButton/>
                {showDayUi && (
                    <IconButton url={'/profile'} icon={'cog'}/>
                )}
            </header>
            <main className={"px-4 pt-16 pb-20 h-dvh"}>
                <Outlet/>
            </main>
            <Footer showDayUi={showDayUi} showTodayButton={showTodayButton}/>

            <i className={'absolute pi left-0 top-0 pi-link ' + `${isAuthenticated ? 'text-green-500' : 'text-red-500'}`}></i>
            <i className={'absolute pi left-6 top-0 pi-spinner-dotted ' + `${isLoading ? 'text-green-500' : 'text-red-500'}`}></i>

        </div>
    );
}