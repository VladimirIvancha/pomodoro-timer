import React from "react";

function Hamburger({
    isOpen,
    onClose,
    switchToWorkTimer,
    switchToRelaxTimer,
}) {

    const classNameHamburger = `hamburger ${isOpen && 'hamburger_is-opened'}`

    return (
        <section className={classNameHamburger}>
            <ul className="hamburger__wrapper">
                <button className="hamburger__close-btn" type="button" onClick={onClose}></button>
                <li className="hamburger__link hamburger__link_red hamburger__link_notlink">Pomodoro Timer</li>
                <li className="hamburger__link" onClick={switchToWorkTimer}>
                    Start to Work!
                </li>
                <li className="hamburger__link" onClick={switchToRelaxTimer}>
                    Begin to Relax!
                </li>
                <a className="hamburger__link hamburger__link_small" target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Pomodoro_Technique">About Pomodoro Technique</a>
                <li className="hamburger__link hamburger__link_red hamburger__link_notlink">StopWatch Timer</li>
                <li className="hamburger__link" onClick={switchToWorkTimer}>
                    Start StopWatch
                </li>
                <li className="hamburger__link hamburger__link_small" onClick={switchToRelaxTimer}>
                    Set Time for StopWatch
                </li>
            </ul>
        </section>
    );
}
export default Hamburger;