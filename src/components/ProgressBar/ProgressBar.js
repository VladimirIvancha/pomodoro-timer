import React from "react";

function ProgressBar({
    timerStage,
    workProgress,
    relaxProgress,
}) {
    
    const classNameProgressTimeLine = `progressbar__work-time-line ${timerStage && 'progressbar__work-time-line_active'}`;

    return (
        <ul className="progressbar__time-lines">
            <li className={classNameProgressTimeLine}>
                <div id="first-interval" className="progressbar__work-progress"></div>
                <p className="progressbar__text">{workProgress}</p>
            </li>
            <li className="progressbar__relax-time-line">
                <div className="progressbar__relax-progress">{relaxProgress}</div>
            </li>
            <li className="progressbar__work-time-line">
                <div className="progressbar__work-progress"></div>
            </li>
            <li className="progressbar__relax-time-line">
                <div className="progressbar__relax-progress"></div>
            </li>
            <li className="progressbar__work-time-line">
                <div className="progressbar__work-progress"></div>
            </li>
            <li className="progressbar__relax-time-line">
                <div className="progressbar__relax-progress"></div>
            </li>
            <li className="progressbar__work-time-line">
                <div className="progressbar__work-progress"></div>
            </li>
            <li className="progressbar__relax-time-line">
                <div className="progressbar__relax-progress"></div>
            </li>
            <li className="progressbar__work-time-line">
                <div className="progressbar__work-progress"></div>
            </li>
        </ul>
    );
}
export default ProgressBar;