import React from "react";
import Hamburger from "../Hamburger/Hamburger"
import Settings from "../Settings/Settings"

function Header() {
  return (
    <>
        <header className="header">
            <button className="header__hamburger"></button>
            <button className="header__settings"></button>
        </header>
        <Hamburger />
        <Settings />
    </>
  );
}
export default Header;