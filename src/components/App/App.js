import React, { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  // Изначальные стейты
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [minSettings, setMinSettings] = useState(1);
  const [headerTitleText, setHeaderTitleText] = useState('Pomodoro Timer')

  // Функция открытия гамбургер-меню
  function handleHamburgerOpen() {
    !isHamburgerOpen ? setIsHamburgerOpen(true) : setIsHamburgerOpen(false);
  }

  // Функция закрытия гамбургер-меню
  function handleHamburgerClose() {
    setIsHamburgerOpen(false);
  }

  // Функция открытия меню настроек
  function handleSettingsOpen() {
    !isSettingsOpen ? setIsSettingsOpen(true) : setIsSettingsOpen(false);
  }

  // Функция закрытия меню настроек
  function handleSetingsClose() {
    setIsSettingsOpen(false);
  }

  return (
    <div className="page">
      <Header 
        handleHamburgerOpen={handleHamburgerOpen}
        handleSettingsOpen={handleSettingsOpen}
        headerTitleText={headerTitleText}
      />
      <Main 
        handleHamburgerClose={handleHamburgerClose}
        handleSetingsClose={handleSetingsClose}
        isHamburgerOpen={isHamburgerOpen}
        isSettingsOpen={isSettingsOpen}
        minSettings={minSettings}
        setMinSettings={setMinSettings}
        setHeaderTitleText={setHeaderTitleText}
        setIsSettingsOpen={setIsSettingsOpen}
      />
      <Footer />
    </div>
  );
}

export default App;
