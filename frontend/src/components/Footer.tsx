import {useDayNavigate} from "../hooks/useDayNavigate.ts";
import TodayButton from "./TodayButton.tsx";

export default function Footer({showDayUi, showTodayButton}: { showDayUi: boolean, showTodayButton: boolean }) {


    const {prevDay, nextDay} = useDayNavigate();

    return (
        <footer
            className={"bg-amber-100/10 fixed bottom-0 max-w-2xl w-full my-4 justify-center flex"}>
            <div className={'flex items-center justify-center rounded-full w-fit'}>

                {showDayUi ?
                    <>
                        <button onClick={prevDay} className={'j-btn h-full px-4'}>
                            <i className={"pi pi-angle-left"}></i>
                        </button>

                        <TodayButton/>

                        <button onClick={nextDay} className={'j-btn h-full px-4'}>
                            <i className={"pi pi-angle-right"}></i>
                        </button>
                    </>

                    : showTodayButton &&
                    <TodayButton/>
                }
            </div>
        </footer>

    )
}