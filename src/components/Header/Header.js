import React  from "react";

function Header({
    handleHamburgerOpen,
    handleSettingsOpen,
    headerTitleText,
}) {
    return (
        <header className="header">
            <button className="header__hamburger" type="button" onClick={handleHamburgerOpen}></button>
            <h2 className="header__title">{headerTitleText}</h2>
            <button className="header__settings" type="button" onClick={handleSettingsOpen}></button>
        </header>
    );
}
export default Header;