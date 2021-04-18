import './navbar.css';

function navbar() {
    return (
        <header>
            <nav id="top-nav">
                <div className="center-nav-items">
                    LOGO
                    <a href="#todolist">TO-DO LIST</a>
                    <a href="#productivity">PRODUCTIVITY</a>
                </div>
                <span className="spacer"></span>
                <span className="nav-item"><i className="fas fa-lg fa-user-cog"></i></span>
            </nav>
        </header>
    )
}

export default navbar;