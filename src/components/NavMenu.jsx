import { NavLink } from "react-router-dom";
import "./NavMenu.css";

function NavMenu() {
    return (
        <div className="nav-menu mb-32">
            <nav className="container justify-content-center">
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/employees">EMPLOYEES</NavLink>
                <NavLink to="/projects">PROJECTS</NavLink>
            </nav>
        </div>
    );
}

export default NavMenu;