import {useLocation} from "react-router-dom";
import Button from "./buttons/Button.tsx";

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
        <Button url={url} label={'Aujourd\'hui'} icon={''}/>
    )
}
