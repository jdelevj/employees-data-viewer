import { useContext } from "react";
import { EmployeesContext } from "../context/EmployeesContext";

function useEmployees () {
    return useContext(EmployeesContext);
}

export {useEmployees};