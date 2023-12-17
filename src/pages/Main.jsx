import React from "react";
import NavMenu from "../components/NavMenu";
import { Outlet } from "react-router-dom";
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