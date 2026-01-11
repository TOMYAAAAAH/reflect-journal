import {useLocation} from "react-router-dom";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";
import Button from "./buttons/Button.tsx";

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
        label = 'Retour';
    }
    else if (currentPage.startsWith('/month')) {
        url = `/year`
        label = 'Année';
    }

    if (url === '') return null;

    return (
        <Button url={url} label={label} icon={'angle-left'}/>
    )
}
