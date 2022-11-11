import "../../index.css";
import React, { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [minSettings, setMinSettings] = useState("");

  function handleHamburgerOpen() {
    !isHamburgerOpen ? setIsHamburgerOpen(true) : setIsHamburgerOpen(false);
  }

  function handleHamburgerClose() {
    setIsHamburgerOpen(false);
  }

  function handleSettingsOpen() {
    !isSettingsOpen ? setIsSettingsOpen(true) : setIsSettingsOpen(false);
  }

  function handleSetingsClose() {
    setIsSettingsOpen(false);
    setMinSettings("");
  }

  const handleSubmitSettings = (evt) => {
    evt.preventDefault();
      
  };

  return (
    <div className="page">
      <Header 
        handleHamburgerOpen={handleHamburgerOpen}
        handleSettingsOpen={handleSettingsOpen}
      />
      <Main 
        handleHamburgerClose={handleHamburgerClose}
        handleSetingsClose={handleSetingsClose}
        isHamburgerOpen={isHamburgerOpen}
        isSettingsOpen={isSettingsOpen}
        minSettings={minSettings}
        setMinSettings={setMinSettings}
        handleSubmitSettings={handleSubmitSettings}
      />
      <Footer />
    </div>
  );
}

export default App;
