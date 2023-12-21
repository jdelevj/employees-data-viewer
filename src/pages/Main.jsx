import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import { EmployeesProvider } from "../context/EmployeesContext";
import { Footer } from "../components/Footer";

function Main() {
    return (
        <EmployeesProvider>
            <div className="Main">
                <header className="Main-header">
                    <div className="mt-32 mb-32">
                        <div className="container justify-content-center">
                            <h1>Employees data viewer</h1>
                        </div>
                    </div>  
                    <NavMenu />
                </header>
                <Outlet />
                <Footer />
            </div>
        </EmployeesProvider>
        
    )
}

export default Main;