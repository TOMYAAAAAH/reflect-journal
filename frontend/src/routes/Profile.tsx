import {Link} from "react-router-dom";
import {useUser} from "../hooks/useUser.ts";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";
import {useState} from "react";

export default function Profile() {

    const logout = () => {
        localStorage.removeItem('token');
    }


    function setTheme(theme: string) {

        if (theme === "dark" || theme === "light") {
            localStorage.setItem("theme", theme);
            document.documentElement.classList.toggle(
                "dark",
                theme === "dark"
            );

        } else {
            localStorage.removeItem("theme");
            document.documentElement.classList.toggle(
                "dark",
                window.matchMedia("(prefers-color-scheme: dark)").matches
            );
        }
    }

    const {data, isLoading} = useUser();

    function getFormatedDate(input: Date | undefined) {
        if (!input) return '';
        const date = new Date(input);
        return date.getDay() + ' ' + getMonthFromNumber(date.getMonth()) + ' ' + date.getFullYear()
    }


    return (
        <>
            <Link to="/">Home</Link>
            <h1>Profile</h1>
            {isLoading ? 'loading...' :

                <>
                    <p>{data?.user?.name}</p>
                    <p>{getFormatedDate(data?.user?.createdAt)}</p>
                </>

            }

            <button onClick={() => setTheme("light")}>
                Light
            </button>

            <button onClick={() => setTheme("dark")}>
                Dark
            </button>

            <button onClick={() => setTheme("system")}>
                System
            </button>

            <button onClick={logout}>Disconnect</button>
        </>
    )
}