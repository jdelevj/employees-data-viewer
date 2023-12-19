import { useEffect, useState } from "react";
import { NestedDataTable } from "../components/NestedDataTable";
import { useEmployees } from "../hooks/useEmployees";
import { nestedGrouping } from "../utils/dataValidations";



function Projects() {
    const { employeesData } = useEmployees();
    const [groupByProject, setGroupByProject] = useState(null);

    useEffect(() => {
        setGroupByProject(nestedGrouping(employeesData, 'projectId', 'employeeId'))
    }, [employeesData])
    return (
        <div>
            <h3>Data Grouped By Project</h3>
            <NestedDataTable data={groupByProject} parentLabel="Project ID:" />
        </div>
    )
}

export default Projects;