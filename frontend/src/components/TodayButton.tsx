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
        <div>
            <Link to={url}><i className={'pi pi-sun text-3xl'}></i>Today</Link>
        </div>
    );
}
