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
                <a className="hamburger__link hamburger__link_red" target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Pomodoro_Technique">Pomodoro Technique</a>
                <li className="hamburger__link" onClick={switchToWorkTimer}>
                    Time to Work!
                </li>
                <li className="hamburger__link" onClick={switchToRelaxTimer}>
                    Time to Relax!
                </li>
            </ul>
        </section>
    );
}
export default Hamburger;