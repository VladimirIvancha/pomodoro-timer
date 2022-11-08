import React, { useState } from "react";

function Main() {
    const DEFAULT_WORK_INTERVAL = 25*60;
    const minutes = Math.floor(DEFAULT_WORK_INTERVAL / 60);
    const seconds = Math.floor(DEFAULT_WORK_INTERVAL / 60 / 60) % 60;
    const defaultMinutes = minutes < 10 ? '0'+minutes : minutes;
    const defaultSeconds = seconds < 10 ? '0'+seconds : seconds;
    
    const [isTimerActive, setTimerActive] = useState(false);
    const [isTimerStarted, setTimerStarted] = useState(false);
    const [timerCountdown, setTimerCountdown] = useState(defaultMinutes+' : '+defaultSeconds);
    const [startTime, setStartTime] = useState(DEFAULT_WORK_INTERVAL);
    const [stopTimer, setStopTimer] = useState(null);

    const classNameStartPause = `main__buttons-button main__buttons-button_play ${isTimerActive && 'main__buttons-button_pause'}`;
    const classNameForward = `main__buttons-button main__buttons-button_forward ${isTimerStarted && 'main__buttons-button_active'}`;
    const classNameStopReset = `main__buttons-button main__buttons-button_stop ${isTimerStarted && 'main__buttons-button_active'}`;

    function startTimer(startTime) {
        if (stopTimer) {
            return;
        }
        let time = startTime;
        let min = parseInt(time / 60);
        if ( min < 1 ) min = 0;
            time = parseInt(time - min * 60);
        if ( min < 10 ) min = '0'+min;
        let seconds = time;
        if ( seconds < 10 ) seconds = '0'+seconds;
        setTimerCountdown(min+' : '+seconds);
        startTime--;
        setStartTime(startTime);
        if (startTime >= 0) { 
            setStopTimer(setTimeout(() => startTimer(startTime), 1000))
        }
    }

    function stopCountdown() {
        clearTimeout(stopTimer);
        setStopTimer(null);
    }

    function handleStartTimer() {
        !isTimerActive ? setTimerActive(true) : setTimerActive(false);
        setTimerStarted(true);
        !isTimerActive ? startTimer(startTime) : stopCountdown();
    }

    function handleResetTimer() {
        stopCountdown();
        setTimerActive(false);
        setTimerStarted(false);
        setStartTime(DEFAULT_WORK_INTERVAL);
        setStopTimer(null);
        setTimerCountdown(defaultMinutes+' : '+defaultSeconds);
    }
    
    return (
        <main className="main">
            <h1 className="main__title">Let`s Start Working!</h1>
            <div className="main__pomodoro-image">
                <p className="main__timer">{timerCountdown}</p>
            </div>
            <div className="main__buttons">
                <button className={classNameForward}></button>
                <button className={classNameStartPause} type="button" onClick={handleStartTimer}></button>
                <button className={classNameStopReset} type="button" onClick={handleResetTimer}></button>
            </div>
        </main>
    );
}
export default Main;