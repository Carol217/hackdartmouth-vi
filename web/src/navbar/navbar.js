import './navbar.css';

function navbar() {
    return (
        <header>
            <nav id="top-nav">
                <img src="/static/Productifylogobigger.png" alt="logo" className="logo"></img>
                <div className="center-nav-items">
                    
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