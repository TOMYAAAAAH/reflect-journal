import {Link} from "react-router-dom";

export default function IconButton({url,  icon = ''}: { url: string, icon: string}) {

    return (
        <Link to={url} className={'j-btn flex items-center gap-2 rounded-full size-12 justify-center'}>
            <i className={`pi pi-${icon} text-xl`}></i></Link>
    )
}
