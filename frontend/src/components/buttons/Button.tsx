import {Link} from "react-router-dom";

export default function Button({url, label, icon = ''}: { url: string, label: string, icon: string}) {

    if (icon === '') return (
        <Link to={url} className={'j-btn flex items-center gap-2 rounded-full px-6 h-12 justify-center'}>
            {label}</Link>
    )

    return (
        <Link to={url} className={'j-btn flex items-center gap-2 rounded-full px-6 h-12 justify-center'}>
            <i className={`pi pi-${icon} text-3xl`}></i>{label}</Link>
    )
}
