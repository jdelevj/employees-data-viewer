import { useEffect, useState } from "react";
import { NestedDataTable } from "../components/NestedDataTable";
import { useEmployees } from "../hooks/useEmployees";
import { nestedGrouping } from "../utils/dataValidations";
import { FileBrowser } from "../components/FileBrowser";



function Projects() {
    const { employeesData } = useEmployees();
    const [groupByProject, setGroupByProject] = useState(null);

    useEffect(() => {
        if (employeesData) {
            setGroupByProject(nestedGrouping(employeesData, 'projectId', 'employeeId'))
        } else {
            setGroupByProject(null);
        }        
    }, [employeesData])
    return (
        <>
            {groupByProject && (
                <div className="container column">
                    <div className="title">Data Grouped By Project</div>
                    <NestedDataTable data={groupByProject} parentLabel="Project ID:" />
                </div>
            )}
            {!employeesData && <FileBrowser />}
        </>

    )
}

export default Projects;