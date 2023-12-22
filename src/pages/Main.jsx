import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import { EmployeesProvider } from "../context/EmployeesContext";
import { Footer } from "../components/Footer";
import "./Main.css";

function Main() {
    return (
        <EmployeesProvider>
            <div className="main">
                <header className="Main-header">
                    <div className="mt-32 mb-32">
                        <div className="container justify-content-center">
                            <h1>Employees data viewer</h1>
                        </div>
                    </div>  
                    <NavMenu />
                </header>
                <div className="mb-32 content"><Outlet /></div>
                <Footer />
            </div>
        </EmployeesProvider>
        
    )
}

export default Main;