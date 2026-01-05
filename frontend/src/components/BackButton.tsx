import {Link, useLocation} from "react-router-dom";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";

export default function BackButton() {

    const location = useLocation();
    const currentPage = location.pathname;

    const currentMonth = new Date().getMonth() + 1;

    let url: string = '';
    let label: string = '';

    if (currentPage === '/') {
        url = `/month/${currentMonth}`
        label = getMonthFromNumber(currentMonth);
    }
    else if (currentPage.startsWith('/day')) {
        const month = parseInt(currentPage.split('/')[2]);
        url = `/month/${month}`
        label = getMonthFromNumber(month);
    }
    else if (currentPage === '/profile') {
        url = `/`;
        label = 'Today';
    }
    else if (currentPage.startsWith('/month')) {
        url = `/year`
        label = 'Year';
    }

    if (url === '') return null;

    return (
        <Link to={url} className={'flex items-center gap-2 rounded-full bg-slate-200 dark:bg-slate-800 px-6 py-2 center'}>
            <i className={'pi pi-angle-left text-2xl'}></i>{label}</Link>
    )
}
