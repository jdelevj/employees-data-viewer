import { NavLink } from "react-router-dom";

function NavMenu() {
    return ( <div>
                <NavLink to="/">Home Page</NavLink>
                <NavLink to="/employee-pairing">Employee Pairing Page</NavLink>
                <NavLink to="/employee-info">Employee Information</NavLink>
                <NavLink to="/project-info">Project Information</NavLink>
            </div>);
}

export default NavMenu;