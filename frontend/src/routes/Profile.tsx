import {Link} from "react-router-dom";
import {useUser} from "../hooks/useUser.ts";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";

export default function Profile() {

    const logout = () => {
        localStorage.removeItem('token');
    }

    const {data, isLoading} = useUser();

    function getFormatedDate(input: Date | undefined) {
        if (!input) return '';
        const date = new Date(input);
        return date.getDay() + ' ' + getMonthFromNumber(date.getMonth()) + ' ' + date.getFullYear()
    }


    return (
        <>
            <Link to="/">Home</Link>
            <h1>Profile</h1>
            {isLoading ? 'loading...' :

                <>
                    <p>{data?.user?.name}</p>
                    <p>{getFormatedDate(data?.user?.createdAt)}</p>
                </>

            }

            <button onClick={logout}>Disconnect</button>
        </>
    )
}