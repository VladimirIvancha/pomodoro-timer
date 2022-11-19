import React from "react";

function ProgressBar({
    timerStage,
    workProgress,
    zeroStage,
}) {
    
    const firstTimeLine = `${zeroStage && 'progressbar__time-line'} ${timerStage === 1 && 'progressbar__time-line_active'} ${timerStage > 1 && 'progressbar__time-line_done'}`;
    const secondTimeLine = `progressbar__time-line ${timerStage === 2 && 'progressbar__time-line_active'} ${timerStage > 2 && 'progressbar__time-line_done progressbar__time-line_pink'}`;
    const thirdTimeLine = `progressbar__time-line ${timerStage === 3 && 'progressbar__time-line_active'} ${timerStage > 3 && 'progressbar__time-line_done'}`;
    const fourthTimeLine = `progressbar__time-line ${timerStage === 4 && 'progressbar__time-line_active'} ${timerStage > 4 && 'progressbar__time-line_done progressbar__time-line_pink'}`;
    const fifthTimeLine = `progressbar__time-line ${timerStage === 5 && 'progressbar__time-line_active'} ${timerStage > 5 && 'progressbar__time-line_done'}`;
    const sixthTimeLine = `progressbar__time-line ${timerStage === 6 && 'progressbar__time-line_active'} ${timerStage > 6 && 'progressbar__time-line_done progressbar__time-line_pink'}`;
    const seventhTimeLine = `progressbar__time-line ${timerStage === 7 && 'progressbar__time-line_active'} ${timerStage > 7 && 'progressbar__time-line_done'}`;
    const eightthTimeLine = `progressbar__time-line ${timerStage === 8 && 'progressbar__time-line_active'} ${timerStage > 8 && 'progressbar__time-line_done progressbar__time-line_pink'}`;
    const ninethTimeLine = `progressbar__time-line ${timerStage === 9 && 'progressbar__time-line_active'} ${timerStage > 9 && 'progressbar__time-line_done'}`;

    return (
        <ul className="progressbar__time-lines">
            <li className={firstTimeLine}>
                <div id="interval-1" className="progressbar__time-progress"></div>
                <p className="progressbar__text">{timerStage === 1 && workProgress}</p>
            </li>
            <li className={secondTimeLine}>
                <div id="interval-2" className="progressbar__time-progress progressbar__time-progress_pink"></div>
                <p className="progressbar__text">{timerStage === 2 && workProgress}</p>
            </li>
            <li className={thirdTimeLine}>
                <div id="interval-3" className="progressbar__time-progress"></div>
                <p className="progressbar__text">{timerStage === 3 && workProgress}</p>
            </li>
            <li className={fourthTimeLine}>
                <div id="interval-4"className="progressbar__time-progress progressbar__time-progress_pink"></div>
                <p className="progressbar__text">{timerStage === 4 && workProgress}</p>
            </li>
            <li className={fifthTimeLine}>
                <div id="interval-5" className="progressbar__time-progress"></div>
                <p className="progressbar__text">{timerStage === 5 && workProgress}</p>
            </li>
            <li className={sixthTimeLine}>
                <div id="interval-6" className="progressbar__time-progress progressbar__time-progress_pink"></div>
                <p className="progressbar__text">{timerStage === 6 && workProgress}</p>
            </li>
            <li className={seventhTimeLine}>
                <div id="interval-7" className="progressbar__time-progress"></div>
                <p className="progressbar__text">{timerStage === 7 && workProgress}</p>
            </li>
            <li className={eightthTimeLine}>
                <div id="interval-8" className="progressbar__time-progress progressbar__time-progress_pink"></div>
                <p className="progressbar__text">{timerStage === 8 && workProgress}</p>
            </li>
            <li className={ninethTimeLine}>
                <div id="interval-9" className="progressbar__time-progress"></div>
                <p className="progressbar__text">{timerStage === 9 && workProgress}</p>
            </li>
        </ul>
    );
}
export default ProgressBar;