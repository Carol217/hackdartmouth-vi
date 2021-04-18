// import React, { Component } from "react";
import './navbar.css';

// class NavbarPage extends Component {
function navbar() {
    return (
        <header>
        <nav id="top-nav">
            <div className="center-nav-items">
                LOGO
                <a href="https://www.figma.com/file/FWrXys7v4SORJqzpGYhe3M/Hackathon-2021?node-id=18%3A0">TO-DO LIST</a>
                <a href="https://www.figma.com/file/FWrXys7v4SORJqzpGYhe3M/Hackathon-2021?node-id=18%3A0">PRODUCTIVITY</a>
            </div>
            <span className="spacer"></span>
            <span className="nav-item"><i className="fas fa-lg fa-user-cog"></i></span>
        </nav>
        </header>
    )
}

export default navbar;