import LargeButton from "./buttons/LargeButton.tsx";

export default function AnswerConnect() {


    return (
        <div className={'flex flex-col gap-2'}>
            <p>Vous devez vous connecter pour répondre aux questions</p>
            <LargeButton url={'/login'} label={'Se connecter'} icon={''}/>
            <LargeButton url={'/register'} label={'Créer un compte'} icon={''}/>
        </div>
    )
}