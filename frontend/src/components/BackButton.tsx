import {useLocation, useNavigate} from "react-router-dom";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";

export default function BackButton() {

    const location = useLocation();
    const currentPage = location.pathname;

    const currentMonth = new Date().getMonth() + 1;

    let url: string = '';
    let label: string = '';

    if (currentPage === '/') {
        url = `/month#${currentMonth}`
        label = getMonthFromNumber(currentMonth);
    }
    else if (currentPage.startsWith('/day')) {
        const month = parseInt(currentPage.split('/')[2]);
        url = `/month#${month}`
        label = getMonthFromNumber(month);
    }
    else if (currentPage === '/profile') {
        url = `/`;
        label = 'Retour';
    }
    else if (currentPage.startsWith('/month')) {
        url = `/year`
        label = 'Année';
    }

    const navigate = useNavigate();

    if (url === '') return null;

    function navigateTo(url: string) {
        if (url === '/year') {

            document.startViewTransition(() => {
                navigate(url, {replace: true})
            })
        } else {
            navigate(url, {replace: true})
        }
    }

    return (
        <button onClick={() => navigateTo(url)} className={'j-btn flex items-center gap-2 rounded-full px-6 h-12 justify-center cursor-pointer'}>
            <i className={`pi pi-angle-left text-3xl`}></i>{label}</button>
    )
}
