import { NavLink } from "react-router-dom";

function NavMenu() {
    return ( <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/employees">Employees</NavLink>
                <NavLink to="/projects">Projects</NavLink>
            </div>);
}

export default NavMenu;