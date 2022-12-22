import React, { useState, useEffect } from "react";
import Hamburger from "../Hamburger/Hamburger";
import Settings from "../Settings/Settings";
import ProgressBar from "../ProgressBar/ProgressBar";
import useSound from 'use-sound';
import timerSound from "../../audio/best-sms-tone meloboom.mp3"
import { BAR, DEFAULT_WORK_INTERVAL, DEFAULT_RELAX_INTERVAL } from "../../utils/constants";

function Main({
    handleHamburgerClose,
    handleSetingsClose,
    isHamburgerOpen,
    isSettingsOpen,
    minSettings,
    setMinSettings,
    setHeaderTitleText,
    setIsSettingsOpen,
}) {    
    // Изначальные стейты
    const [isTimerActive, setTimerActive] = useState(false);
    const [isTimerStarted, setTimerStarted] = useState(false);
    const [startTime, setStartTime] = useState(DEFAULT_WORK_INTERVAL);
    const [defaultStartTime, setDefaultStartTime] = useState(DEFAULT_WORK_INTERVAL)
    const [stopTimer, setStopTimer] = useState(null);
    const [titleText, setTitleText] = useState('Let`s Start Working!')
    const [relaxTimerMode, setRelaxTimerMode] = useState(false);
    const [stopWatchTimerMode, setStopWatchTimerMode] = useState(false);
    const [timerStage, setTimerStage] = useState(1);
    const [workProgress, setWorkProgress] = useState('');
    const [zeroStage, setZeroStage] = useState(false);
    const [intervalId, setIntervalId] = useState(BAR[0]);
    const [eject, setEject] = useState(false);

    // Стейт для проигрывания звука
    const [play] = useSound(timerSound);
    
    // Расчет вводных данных для таймеров
    const minutes = Math.floor(defaultStartTime / 60);
    const seconds = defaultStartTime % 60;
    const defaultMinutes = minutes < 10 ? minutes < 1 ? '00' : '0'+minutes : minutes;
    const defaultSeconds = seconds < 10 ? '0'+seconds : seconds;
    const [timerCountdown, setTimerCountdown] = useState(defaultMinutes+' : '+defaultSeconds);
    
    // Классы
    const classNameStartPauseEject = `main__buttons-button main__buttons-button_play ${isTimerActive && 'main__buttons-button_pause'} ${eject && 'main__buttons-button_eject'}`;
    const classNameForward = `main__buttons-button main__buttons-button_forward ${isTimerStarted && !stopWatchTimerMode && 'main__buttons-button_active'}`;
    const classNameStopReset = `main__buttons-button main__buttons-button_stop ${isTimerStarted && 'main__buttons-button_active'}`;

    // Реакция на состояние некоторых стейтов
    useEffect(() => {
        relaxTimerMode ? setDefaultStartTime(DEFAULT_RELAX_INTERVAL) : stopWatchTimerMode ? setDefaultStartTime(minSettings*60) : setDefaultStartTime(DEFAULT_WORK_INTERVAL);
    }, [relaxTimerMode, stopWatchTimerMode, minSettings]);

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

    // Функция очистки ВСЕХ цветных шкал прогресс-баров
    function clearAllProgressWidth() {
        BAR.forEach(item => {
            const elem = document.querySelector(item);
            elem.style.width = '0%';
        })    
    }

    // Функция очистки текущей шкалы прогресс-бара
    function clearProgressWidth() {
        const elem = document.querySelector(intervalId);
        elem.style.width = '0%';
    }

    // Функция запуска помодоро таймера в режиме work и relax
    function startTimer(startTime) {
        if (stopTimer || timerStage > 9) {
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
        if (!stopWatchTimerMode) {
            let progressWidth = Math.round(100 * (1 - startTime/defaultStartTime));
            let elem = document.querySelector(intervalId);
            elem.style.width = progressWidth + '%';
            setWorkProgress(progressWidth * 1  + '%');
        }
        startTime--;
        setStartTime(startTime);
        if (startTime >= 0) { 
            setStopTimer(setTimeout(() => startTimer(startTime), 1000))
        } else if (startTime < 0 && timerStage <= 9) {
            handleNextTimer();
            return;
        } else if (startTime < 0 && timerStage === 0) {
            handleResetTimer();
        } else {
            stopCountdown();
        }
    }

    // Кнопка запуска и паузы
    function handleStartTimer() {
        if (timerStage > 9) {
            switchToWorkTimer();
            return;
        }
        !isTimerActive ? setTimerActive(true) : setTimerActive(false);
        timerStage <= 1 && !stopWatchTimerMode && setTimerStage(1);
        !isTimerActive ? startTimer(startTime) : stopCountdown();
        !isTimerActive ? !relaxTimerMode ? stopWatchTimerMode ? setTitleText('Counting Down...') : setTitleText('Working Hard...') : setTitleText('Relaxing...') : setTitleText('Pausing...');
        setTimerStarted(true);
        setZeroStage(true);
    }

    //Кнопка стоп (полный сброс)
    function handleResetTimer() {
        stopCountdown();
        setTimerActive(false);
        setTimerStarted(false);
        setWorkProgress('');
        clearProgressWidth();
        !relaxTimerMode && timerStage === 1 && setTimerStage(1);
        setTimerCountdown(defaultMinutes+' : '+defaultSeconds);
        relaxTimerMode ? setStartTime(DEFAULT_RELAX_INTERVAL) : stopWatchTimerMode ? setStartTime(minSettings*60) : setStartTime(DEFAULT_WORK_INTERVAL);
        relaxTimerMode ? setTitleText('Let`s Relax a Littlebit!')  : stopWatchTimerMode ? setTitleText('Let`s Start Countdown!') : setTitleText('Let`s Start Working!');
    }

    // Кнопка следующий этап таймера/возвращение на новый виток
    function handleNextTimer() {
        if (timerStage >= 9) {
            setTitleText('Good job, Man! Wanna do it again?');
            setEject(true);
            stopCountdown();
            setTimerActive(false);
            setTimerStarted(false);
            setWorkProgress('');
            setTimerStage(timerStage + 1);
            setTimerCountdown(preDefaultMinutes(DEFAULT_WORK_INTERVAL)+' : '+preDefaultSeconds(DEFAULT_WORK_INTERVAL));
            setStartTime(DEFAULT_WORK_INTERVAL);
            play();
            return;
        } else if (stopWatchTimerMode) {
            play();
            switchToStopWatch();
            return;
        }
        stopCountdown();
        setIntervalId(BAR[timerStage]);
        setTimerActive(false);
        setTimerStarted(false);
        setWorkProgress('');
        setTimerStage(timerStage + 1);
        !relaxTimerMode ? setTimerCountdown(preDefaultMinutes(DEFAULT_RELAX_INTERVAL)+' : '+preDefaultSeconds(DEFAULT_RELAX_INTERVAL)) : setTimerCountdown(preDefaultMinutes(DEFAULT_WORK_INTERVAL)+' : '+preDefaultSeconds(DEFAULT_WORK_INTERVAL));
        !relaxTimerMode ? setRelaxTimerMode(true) : setRelaxTimerMode(false);
        !relaxTimerMode ? setStartTime(DEFAULT_RELAX_INTERVAL) : setStartTime(DEFAULT_WORK_INTERVAL);
        !relaxTimerMode ? setTitleText('Let`s Relax a Littlebit!') : setTitleText('Let`s Start Working!');
        play();
    }

    // Переход из гамбургер-меню на таймер работы 
    function switchToWorkTimer() {
        stopCountdown();
        setTimerActive(false);
        setTimerStarted(false);
        setTimerStage(1);
        setIntervalId(BAR[0]);
        setWorkProgress('');
        clearAllProgressWidth();
        setStopTimer(null);
        setRelaxTimerMode(false);
        setStopWatchTimerMode(false);
        setStartTime(DEFAULT_WORK_INTERVAL);
        setTimerCountdown(preDefaultMinutes(DEFAULT_WORK_INTERVAL)+' : '+preDefaultSeconds(DEFAULT_WORK_INTERVAL));
        setTitleText('Let`s Start Working!');
        setEject(false);
        handleHamburgerClose();
        setZeroStage(false);
        setHeaderTitleText('Pomodoro Timer');
    }

    // Переход из гамбургер-меню на таймер отдыха
    function switchToRelaxTimer() {
        stopCountdown();
        setTimerActive(false);
        setTimerStarted(false);
        setTimerStage(2);
        setIntervalId(BAR[1]);
        setWorkProgress('');
        clearAllProgressWidth();
        setStopTimer(null);
        setRelaxTimerMode(true);
        setStopWatchTimerMode(false);
        setStartTime(DEFAULT_RELAX_INTERVAL);
        setTimerCountdown(preDefaultMinutes(DEFAULT_RELAX_INTERVAL)+' : '+preDefaultSeconds(DEFAULT_RELAX_INTERVAL));
        setTitleText('Let`s Relax a Littlebit!');
        setEject(false);
        handleHamburgerClose();
        setZeroStage(true);
        setHeaderTitleText('Pomodoro Timer');
    }

    // Переход из гамбургер-меню на таймер StopWatch
    function switchToStopWatch() {
        stopCountdown();
        setTimerActive(false);
        setTimerStarted(false);
        setWorkProgress('');
        setStopTimer(null);
        clearAllProgressWidth();
        setRelaxTimerMode(false);
        setStopWatchTimerMode(true);
        setStartTime(minSettings*60);
        setTimerCountdown(preDefaultMinutes(minSettings*60)+' : '+preDefaultSeconds(minSettings*60));
        setTitleText('Let`s Start Countdown!');
        setEject(false);
        handleHamburgerClose();
        setZeroStage(false);
        setHeaderTitleText('Simple StopWatch');
    }

    // Переход из гамбургер-меню в меню настроек
    function switchToStopWatchSettings() {
        handleHamburgerClose();
        setIsSettingsOpen(true);
    }

    // Закрытие меню настройки и переход на таймер StopWatch после установки времени отсчета
    const handleSubmitSettings = (evt) => {
        evt.preventDefault();
        setIsSettingsOpen(false);
        switchToStopWatch();
    };
    
    return (
        <>
            <main className="main">
                <h1 className="main__title">{titleText}</h1>
                <div className={`main__pomodoro-image ${stopWatchTimerMode && 'main__pomodoro-image_stopwatch'}`}>
                    <p className={`main__timer ${stopWatchTimerMode && 'main__timer_stopwatch'}`}>{timerCountdown}</p>
                </div>
                <div className="main__buttons">
                    <button className={classNameForward} type="button" onClick={handleNextTimer}></button>
                    <button className={classNameStartPauseEject} type="button" onClick={handleStartTimer}></button>
                    <button className={classNameStopReset} type="button" onClick={handleResetTimer}></button>
                </div>
                <ProgressBar 
                    timerStage={timerStage}
                    workProgress={workProgress}
                    zeroStage={zeroStage}
                    stopWatchTimerMode={stopWatchTimerMode}
                />
            </main>
            <Hamburger 
                isOpen={isHamburgerOpen}
                onClose={handleHamburgerClose}
                switchToWorkTimer={switchToWorkTimer}
                switchToRelaxTimer={switchToRelaxTimer}
                switchToStopWatch={switchToStopWatch}
                switchToStopWatchSettings={switchToStopWatchSettings}
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