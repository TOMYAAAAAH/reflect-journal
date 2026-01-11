import LargeButton from "../components/buttons/LargeButton.tsx";

export default function OnBoarding() {

    return (
        <div className={'flex flex-col gap-6 py-12 w-fit mx-auto'}>

            <h1 className={'text-4xl text-center'}>
                <span className={'text-lg'}>Bienvenue dans ton</span><br/>
                Journal de Reflexion
            </h1>
            <p className={'text-lg'}><span className={'text-3xl'}>📆</span> Répond chaque jour à une question</p>
            <p className={'text-lg'}><span className={'text-3xl'}>🎉</span> L'année suivante, répond aux mêmes questions</p>
            <p className={'text-lg'}><span className={'text-3xl'}>🪞</span> Constate ton évolution</p>
            <LargeButton url={'/'} label={'Continuer'} icon={''}/>
        </div>
    )
}