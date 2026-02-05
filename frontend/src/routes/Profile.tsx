import {useUser} from "../hooks/useUser.ts";
import getMonthFromNumber from "../utils/getMonthFromNumber.ts";
import ThemeSelector from "../components/buttons/ThemeSelector.tsx";
import Button from "../components/buttons/Button.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

export default function Profile() {

    const {data, isLoading} = useUser();
    const {logout, isAuthenticated, isLoading: isAuthLoading} = useAuth();
    const navigate = useNavigate();

    const disconnect = () => {
        logout();
        navigate("/");
    }

    function getFormatedDate(input: Date | undefined) {
        if (!input) return '';
        const date = new Date(input);
        return date.getDay() + ' ' + getMonthFromNumber(date.getMonth()) + ' ' + date.getFullYear()
    }

    return (
        <>
            {isAuthenticated && !isAuthLoading &&
                <p className={"text-center text-green-500 mt-6"}
                >Vous êtes connecté <i className={"pi pi-check"}></i></p>
            }

            <h2 className={'text-3xl my-4'}>Préférences</h2>

            <div>
                <p>Thème</p>
                <ThemeSelector/>
            </div>


            <Button url={'/welcome'} label={'Revoir la bienvenue'} icon={''}/>

            <hr className={'text-gray-500/20 my-2'}/>

            <h2 className={'text-3xl my-4'}>Compte</h2>


            {isAuthenticated && !isLoading &&

                <>
                    <div className="flex items-center justify-between w-full">
                        <span>Email</span>
                        <span>{data?.user?.email}</span>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <span>Pseudo</span>
                        <span>{data?.user?.name}</span>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <span>Création du compte</span>
                        <span>{getFormatedDate(data?.user?.createdAt)}</span>
                    </div>
                </>
            }

            <hr className={'text-gray-500/20 my-2'}/>

            Besoin d'aide

            <hr className={'text-gray-500/20 my-2'}/>

            <div className="flex items-center justify-between w-full">
                <span>Version</span>
                <span>Alpha 1.1</span>
            </div>

            <hr className={'text-gray-500/20 my-2'}/>

            <button className={'j-btn rounded-full px-6 h-12'} onClick={disconnect}>Me déconnecter</button>




        </>
    )
}