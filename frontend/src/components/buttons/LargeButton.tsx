import {Link} from "react-router-dom";

export default function LargeButton({url, label, icon = ''}: { url: string, label: string, icon: string}) {

    if (icon === '') return (
        <Link to={url} className={'j-btn flex items-center gap-2 rounded-full px-6 h-14 justify-center cursor-pointer'}>
            {label}</Link>
    )

    return (
        <Link to={url} className={'j-btn flex items-center gap-2 rounded-full px-6 h-14 justify-center cursor-pointer'}>
            <i className={`pi pi-${icon} text-3xl`}></i>{label}</Link>
    )
}
