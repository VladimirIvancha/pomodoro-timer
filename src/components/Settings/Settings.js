import React, { useState, useEffect } from "react";

function Settings({
    isSettingsOpen,
    handleSetingsClose,
    minSettings,
    setMinSettings,
    handleSubmitSettings,
}) {
    // Классы
    const classNameSettings = `settings ${isSettingsOpen && 'settings_is-opened'}`

    // Изначальные стейты
    const [disabled, setDisabled] = useState(false);

    // Реакция на состояние некоторых стейтов
    useEffect(() => {
        minSettings ? setDisabled(false) : setDisabled(true);
    }, [minSettings]);

    // Функция установки значения формы в стейт StoWatch
    function handleChange(e) {
        setMinSettings(e.target.value);
    }

    return (
        <section className={classNameSettings}>
            <div className="settings__wrapper">
                <button className="settings__close-btn" type="button" onClick={handleSetingsClose}></button>
                <h2 className="settings__link settings__link_red">Settings</h2>
                <form 
                    className="settings__form"
                    id="settings"
                    name="settings"
                    onSubmit={handleSubmitSettings}   
                >
                    <div className="settings__wrapper">
                        <p className="hamburger__link hamburger__link_small hamburger__link_notlink">Set time for StopWatch, min</p>
                        <input
                            className="settings__input"
                            type="text"
                            name="minutes"
                            value={minSettings || ''}
                            onChange={handleChange}
                            pattern="^[0-9]+$"
                            required
                        ></input>
                    </div>
                    <button className={`settings__button ${disabled && 'settings__button_disabled'}`} type="submit">
                        Set
                    </button>
                </form>
            </div>
        </section>
    );
}
export default Settings;
