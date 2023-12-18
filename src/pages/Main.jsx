import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import { EmployeesProvider } from "../context/EmployeesContext";

function Main() {
    return (
        <EmployeesProvider>
            <div className="Main">
                <header className="Main-header">
                    <NavMenu />
                </header>
                <Outlet />
            </div>
        </EmployeesProvider>
        
    )
}

export default Main;