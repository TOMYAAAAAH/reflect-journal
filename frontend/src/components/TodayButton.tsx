import {useLocation, useNavigate} from "react-router-dom";

export default function TodayButton() {

    const location = useLocation();
    const currentPage = location.pathname;

    const currentMonth = new Date().getMonth() + 1;

    let url: string;
    switch (currentPage) {
        case '/year':
            url = `/month#${currentMonth}`;
            break;
        default:
            url = '/';

    }

    const navigate = useNavigate();

    function navigateTo(url: string) {
        if (currentPage === '/year') {

            document.startViewTransition(() => {
                navigate(url, {replace: true})
            })
        } else {
            navigate(url, {replace: true})
        }
    }

    return (
        <div onClick={() => navigateTo(url)} className={'j-btn flex items-center gap-2 rounded-full px-6 h-12 justify-center'}>
        Aujourd'hui</div>
    )
}
