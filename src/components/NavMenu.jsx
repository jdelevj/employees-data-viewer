import { NavLink } from "react-router-dom";

function NavMenu() {
    return ( <div>
                <NavLink to="/">Home Page</NavLink>
                <NavLink to="/employee-pairing">Employee Pairing Page</NavLink>
                <NavLink to="/filter-page">Filter Page</NavLink>
                <NavLink to="/search-page">Search Page</NavLink>
            </div>);
}

export default NavMenu;