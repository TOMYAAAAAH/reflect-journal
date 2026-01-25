import {useUser} from "../hooks/useUser.ts";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";
import ThemeSelector from "../components/buttons/ThemeSelector.tsx";
import Button from "../components/buttons/Button.tsx";
import {useQueryClient} from "@tanstack/react-query";

export default function Profile() {

    const qc = useQueryClient();

    const logout = () => {
        localStorage.removeItem('token');
        qc.invalidateQueries({queryKey: ['me']})
    }

    const {data, isLoading} = useUser();

    function getFormatedDate(input: Date | undefined) {
        if (!input) return '';
        const date = new Date(input);
        return date.getDay() + ' ' + getMonthFromNumber(date.getMonth()) + ' ' + date.getFullYear()
    }


    return (
        <>
            <h2 className={'text-3xl mt-8 mb-4'}>Mon compte</h2>


            {isLoading ? 'loading...' :

                <>
                    <p>{data?.user?.name}</p>
                    <p>{getFormatedDate(data?.user?.createdAt)}</p>
                </>

            }
            <h2 className={'text-3xl mt-8 mb-4'}>Parametres</h2>

            <ThemeSelector/>

            <button className={'j-btn rounded-full px-6 h-12'} onClick={logout}>Me déconnecter</button>

            <Button url={'/welcome'} label={'On Boarding'} icon={''}/>
        </>
    )
}