import { createContext, useState } from "react"

export const EmployeesContext = createContext();

export function EmployeesProvider({children}) {
    const [employeesData, setEmployeesData] = useState(null);
    return (
        <EmployeesContext.Provider value={{employeesData, setEmployeesData}}>{children}</EmployeesContext.Provider>
    )
}