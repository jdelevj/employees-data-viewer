import { useEffect, useState } from "react";
import { NestedDataTable } from "../components/NestedDataTable";
import { useEmployees } from "../hooks/useEmployees";
import { nestedGrouping } from "../utils/dataValidations";



function Employees() {
    const { employeesData } = useEmployees();
    const [groupByEmployee, setGroupByEmployee] = useState(null);

    useEffect(() => {
        setGroupByEmployee(nestedGrouping(employeesData, 'employeeId', 'projectId'))
    }, [employeesData])
    return (
        <div>
            <h3>Data Grouped By Employee</h3>
            <NestedDataTable data={groupByEmployee} parentLabel="Employee ID:" />
        </div>
    )
}

export default Employees;