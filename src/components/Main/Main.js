import React, { useState, useEffect } from "react";
import Hamburger from "../Hamburger/Hamburger";
import Settings from "../Settings/Settings";
import ProgressBar from "../ProgressBar/ProgressBar";

function Main({
    handleHamburgerClose,
    handleSetingsClose,
    isHamburgerOpen,
    isSettingsOpen,
    minSettings,
    setMinSettings,
    handleSubmitSettings,
}) {
    // Константы
    const DEFAULT_WORK_INTERVAL = 25*60;
    const DEFAULT_RELAX_INTERVAL = 5*60;
    
    // Изначальные стейты
    const [isTimerActive, setTimerActive] = useState(false);
    const [isTimerStarted, setTimerStarted] = useState(false);
    const [startTime, setStartTime] = useState(DEFAULT_WORK_INTERVAL);
    const [defaultStartTime, setDefaultStartTime] = useState(DEFAULT_WORK_INTERVAL)
    const [stopTimer, setStopTimer] = useState(null);
    const [titleText, setTitleText] = useState('Let`s Start Working!')
    const [relaxTimerMode, setRelaxTimerMode] = useState(false);
    const [timerStage, setTimerStage] = useState(0);
    const [workProgress, setWorkProgress] = useState('');
    const [relaxProgress, setRelaxProgress] = useState('');
    const [stopProgress, setStopProgress] = useState(null);
    const [barWidth, setBarWidth] = useState(0)
    const [intervalId, setIntervalId] = useState('#first-interval');
    
    
    // Расчет вводных данных для таймеров
    const minutes = Math.floor(defaultStartTime / 60);
    const seconds = defaultStartTime % 60;
    const defaultMinutes = minutes < 10 ? minutes < 1 ? '00' : '0'+minutes : minutes;
    const defaultSeconds = seconds < 10 ? '0'+seconds : seconds;
    const [timerCountdown, setTimerCountdown] = useState(defaultMinutes+' : '+defaultSeconds);
    
    // Классы
    const classNameStartPause = `main__buttons-button main__buttons-button_play ${isTimerActive && 'main__buttons-button_pause'}`;
    const classNameForward = `main__buttons-button main__buttons-button_forward ${isTimerStarted && 'main__buttons-button_active'}`;
    const classNameStopReset = `main__buttons-button main__buttons-button_stop ${isTimerStarted && 'main__buttons-button_active'}`;

    // Реакция на состояние некоторых стейтов
    useEffect(() => {
        relaxTimerMode ? setDefaultStartTime(DEFAULT_RELAX_INTERVAL) : setDefaultStartTime(DEFAULT_WORK_INTERVAL);
    }, [relaxTimerMode, DEFAULT_RELAX_INTERVAL, DEFAULT_WORK_INTERVAL]);

    // Функция расчета исходных минут (при переключении на новый этап таймера)
    function preDefaultMinutes(data) {
        const minutes = Math.floor(data / 60);
        return minutes < 10 ? minutes < 1 ? '00' : '0'+minutes : minutes;
    }

    // Функция расчета исходных минут (при переключении на новый этап таймера)
    function preDefaultSeconds(data) {
        const seconds = data % 60;
        return seconds < 10 ? '0'+seconds : seconds;
    }

    // Функция остановки таймера
    function stopCountdown() {
        clearTimeout(stopTimer);
        setStopTimer(null);
    }

    // // Функция остановки прогресс-бара
    // function stopProgressBar() {
    //     clearInterval(stopProgress);
    //     setStopProgress(null);
    // }

    // Функция запуска таймера
    function startTimer(startTime) {
        if (stopTimer) {
            return;
        }
        setTimerStage(1);
        let time = startTime;
        let min = parseInt(time / 60);
        if ( min < 1 ) min = 0;
            time = parseInt(time - min * 60);
        if ( min < 10 ) min = '0'+min;
        let seconds = time;
        if ( seconds < 10 ) seconds = '0'+seconds;
        setTimerCountdown(min+' : '+seconds);

        let progressWidth = Math.round(100 * (1 - startTime/defaultStartTime));
        // const interval = (defaultStartTime/100)*1000;
        let elem = document.querySelector(intervalId);
        setBarWidth(progressWidth);
        elem.style.width = progressWidth + '%'; 
        setWorkProgress(progressWidth * 1  + '%');

        startTime--;
        setStartTime(startTime);
        
        if (startTime >= 0) { 
            setStopTimer(setTimeout(() => startTimer(startTime), 1000))
        } else if (startTime < 0 && timerStage <= 9) {
            handleNextTimer();
        } else {
            stopCountdown();
            setTitleText('Working Hard...');
        }
    }

    // // Функция запуска прогресс-бара
    // function workProgressBar(barWidth) {
    //     if (stopProgress) {
    //         return;
    //     }
    //     const interval = (defaultStartTime/100)*1000;
    //     let elem = document.querySelector(intervalId);
    //     barWidth++;
    //     setBarWidth(barWidth);
    //     elem.style.width = barWidth + '%'; 
    //     setWorkProgress(barWidth * 1  + '%');
    //     if (barWidth < 100) { 
    //         setStopProgress(setInterval(() => workProgressBar(barWidth), interval));
    //     } else {
    //         stopProgressBar();
    //     }
    // }

    // Кнопка запуска и паузы
    function handleStartTimer() {
        !isTimerActive ? setTimerActive(true) : setTimerActive(false);
        setTimerStarted(true);
        !isTimerActive ? startTimer(startTime) : stopCountdown();
        !isTimerActive ? !relaxTimerMode ? setTitleText('Working Hard...') : setTitleText('Relaxing...') : setTitleText('Pausing...');
    }

    //Кнопка стоп (полный сброс)
    function handleResetTimer() {
        stopCountdown();
        setBarWidth(0);
        setTimerActive(false);
        setTimerStarted(false);
        setTimerStage(0);
        setTimerCountdown(defaultMinutes+' : '+defaultSeconds);
        relaxTimerMode ? setStartTime(DEFAULT_RELAX_INTERVAL) : setStartTime(DEFAULT_WORK_INTERVAL);
        relaxTimerMode ? setTitleText('Let`s Relax a Littlebit!')  : setTitleText('Let`s Start Working!');
    }

    // Кнопка следующий этап таймера
    function handleNextTimer() {
        stopCountdown();
        // stopProgressBar();
        setTimerActive(false);
        setTimerStarted(false);
        setTimerStage(timerStage + 1);
        !relaxTimerMode ? setTimerCountdown(preDefaultMinutes(DEFAULT_RELAX_INTERVAL)+' : '+preDefaultSeconds(DEFAULT_RELAX_INTERVAL)) : setTimerCountdown(preDefaultMinutes(DEFAULT_WORK_INTERVAL)+' : '+preDefaultSeconds(DEFAULT_WORK_INTERVAL));
        !relaxTimerMode ? setRelaxTimerMode(true) : setRelaxTimerMode(false);
        !relaxTimerMode ? setStartTime(DEFAULT_RELAX_INTERVAL) : setStartTime(DEFAULT_WORK_INTERVAL);
        !relaxTimerMode ? setTitleText('Let`s Relax a Littlebit!') : setTitleText('Let`s Start Working!');
    }

    // Переход из гамбургер-меню на таймер работы 
    function switchToWorkTimer() {
        stopCountdown();
        setTimerActive(false);
        setTimerStarted(false);
        setStopTimer(null);
        setRelaxTimerMode(false);
        setStartTime(DEFAULT_WORK_INTERVAL);
        setTimerCountdown(preDefaultMinutes(DEFAULT_WORK_INTERVAL)+' : '+preDefaultSeconds(DEFAULT_WORK_INTERVAL));
        setTitleText('Let`s Start Working!');
        handleHamburgerClose();
    }

    // Переход из гамбургер-меню на таймер отдыха
    function switchToRelaxTimer() {
        stopCountdown();
        setTimerActive(false);
        setTimerStarted(false);
        setStopTimer(null);
        setRelaxTimerMode(true);
        setStartTime(DEFAULT_RELAX_INTERVAL);
        setTimerCountdown(preDefaultMinutes(DEFAULT_RELAX_INTERVAL)+' : '+preDefaultSeconds(DEFAULT_RELAX_INTERVAL));
        setTitleText('Let`s Relax a Littlebit!');
        handleHamburgerClose();
    }
    
    return (
        <>
            <main className="main">
                <h1 className="main__title">{titleText}</h1>
                <div className="main__pomodoro-image">
                    <p className="main__timer">{timerCountdown}</p>
                </div>
                <div className="main__buttons">
                    <button className={classNameForward} type="button" onClick={handleNextTimer}></button>
                    <button className={classNameStartPause} type="button" onClick={handleStartTimer}></button>
                    <button className={classNameStopReset} type="button" onClick={handleResetTimer}></button>
                </div>
                <ProgressBar 
                    timerStage={timerStage}
                    workProgress={workProgress}
                    relaxProgress={relaxProgress}
                />
            </main>
            <Hamburger 
                isOpen={isHamburgerOpen}
                onClose={handleHamburgerClose}
                switchToWorkTimer={switchToWorkTimer}
                switchToRelaxTimer={switchToRelaxTimer}
            />
            <Settings 
                isSettingsOpen={isSettingsOpen}
                handleSetingsClose={handleSetingsClose}
                minSettings={minSettings}
                setMinSettings={setMinSettings}
                handleSubmitSettings={handleSubmitSettings}
            />
        </>
    );
}
export default Main;