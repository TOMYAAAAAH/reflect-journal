import {useState} from "react";

export default function ThemeSelector() {

    const currentTheme = localStorage.getItem("theme") || 'system';
    const [theme, setTheme] = useState<string>(currentTheme);

    function updateTheme(theme: string) {

        if (theme === "dark" || theme === "light") {
            localStorage.setItem("theme", theme);
            document.documentElement.classList.toggle(
                "dark",
                theme === "dark"
            );
            setTheme(theme)

        } else {
            localStorage.removeItem("theme");
            document.documentElement.classList.toggle(
                "dark",
                window.matchMedia("(prefers-color-scheme: dark)").matches
            );
            setTheme('system')
        }
    }
    const buttons = [
        ["system", "Système"],
        ["light", "Clair"],
        ["dark", "Sombre"]
    ]

    return (<div className={'flex items-center gap-4'}>

        <div className={'bg-slate-500/20 p-1 rounded-full w-fit'}>
            {buttons.map(([value, label]) => (

                <button onClick={() => updateTheme(value)} className={"rounded-full px-4 py-2 cursor-pointer " +
                    `${theme === value && 'bg-amber-500/20'}` }>
                    {label}
                </button>
            ))}</div>

    </div>)
}
