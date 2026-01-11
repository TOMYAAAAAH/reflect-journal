import LargeButton from "../components/buttons/LargeButton.tsx";

export default function NotFound() {

    return (
        <>
            <h1 className={'text-2xl mb-6'}>Il semblerait que cette page ait été déchirée...</h1>
            <LargeButton url={'/'} label={'Retourne à la page du jour'} icon={''}/>
        </>
    )
}