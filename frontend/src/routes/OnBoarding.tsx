import LargeButton from "../components/buttons/LargeButton.tsx";

export default function OnBoarding() {

    return (
        <div className={'flex flex-col justify-center gap-8 w-fit h-full m-auto'}>

            <h1 className={'text-center leading-10'}>
                <span className={'text-lg'}>Bienvenue dans ton</span><br/>
                <span className={'font-medium text-4xl'}>Journal de Reflexion</span>
            </h1>
            <div className={'flex flex-col gap-6 text-lg'}>
                <p className={'flex items-center'}><span className={'text-3xl pr-3'}>📆</span> Répond chaque jour à une question</p>
                <p className={'flex items-center'}><span className={'text-3xl pr-3'}>🎉</span> L'année suivante, répond aux mêmes
                    questions</p>
                <p className={'flex items-center'}><span className={'text-3xl pr-3'}>🪞</span> Constate ton évolution</p>
            </div>
            <LargeButton url={'/'} label={'Continuer'} icon={''}/>
        </div>
    )
}