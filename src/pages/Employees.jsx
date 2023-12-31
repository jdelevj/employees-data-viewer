import { useEffect, useState } from "react";
import { NestedDataTable } from "../components/NestedDataTable";
import { useEmployees } from "../hooks/useEmployees";
import { nestedGrouping } from "../utils/dataValidations";
import { FileBrowser } from "../components/FileBrowser";



function Employees() {
    const { employeesData } = useEmployees();
    const [groupByEmployee, setGroupByEmployee] = useState(null);

    useEffect(() => {
        if (employeesData) {
            setGroupByEmployee(nestedGrouping(employeesData, 'employeeId', 'projectId'));
        } else {
            setGroupByEmployee(null);
        }
        
    }, [employeesData])
    return (
        <>
            {groupByEmployee && (
                <div className="container column">
                    <div className="title">Data Grouped By Employee</div>
                    <NestedDataTable data={groupByEmployee} parentLabel="Employee ID:" />
                </div>
            )}
            {!employeesData && <FileBrowser />}
        </>
    )
}

export default Employees;