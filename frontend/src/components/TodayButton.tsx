import {Link, useLocation} from "react-router-dom";

export default function TodayButton() {

    const location = useLocation();
    const currentPage = location.pathname;

    const currentMonth = new Date().getMonth() + 1;

    let url: string;
    switch (currentPage) {
        case '/year':
            url = `/month/${currentMonth}`;
            break;
        default:
            url = '/';

    }

    return (
        <Link to={url} className={'flex items-center gap-2 rounded-full bg-slate-200 dark:bg-slate-800 px-6 py-2 center'}>
            <i className={'pi pi-sun text-3xl'}></i>Today</Link>
    )
}
