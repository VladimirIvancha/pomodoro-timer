import React from "react";

function Header({
    handleHamburgerOpen,
    handleSettingsOpen,
}) {
    return (
        <>
            <header className="header">
                <button className="header__hamburger" type="button" onClick={handleHamburgerOpen}></button>
                <button className="header__settings" type="button" onClick={handleSettingsOpen}></button>
            </header>
        </>
    );
}
export default Header;