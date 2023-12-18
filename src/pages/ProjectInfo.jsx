import { useEffect, useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import { formatDate } from "../utils/dateUtils";

function ProjectInfo() {
    const { employeesData } = useEmployees();
    const [groupByProject, setGroupByProject] = useState(null);
    useEffect(() => {
        const result = employeesData.reduce((acc, record) => {
            let project = acc[record.projectId];
            if (!project) {
                project = {
                    projectId: record.projectId,
                    employees: {},
                    //TODO: pairs
                };

                acc[record.projectId] = project;
            }

            let employee = project.employees[record.employeeId];
            if (!employee) {
                employee = {
                    employeeId: record.employeeId,
                    workingPeriods: [{ from: record.dateFrom, to: record.dateTo }],
                };
                project.employees[record.employeeId] = employee;
            } else {
                employee.workingPeriods.push({ from: record.dateFrom, to: record.dateTo });
            }

            return acc;
        }, {})

        setGroupByProject(result);
    }, [employeesData]);

    function tableProject() {
        return (
            <table>{Object.keys(groupByProject).map(projectId => projectRow(groupByProject[projectId]))}</table>
        )
    }

    function projectRow(project) {
        return (
            <>
                <tr><td colSpan={2}>Project ID: {project.projectId}</td></tr> 
                {Object.keys(project.employees).map((employeeId) => employeeRow(project.employees[employeeId]))}
            </>
        )
    }
    
    function employeeRow(employee) {
        return (
            <tr><td>{employee.employeeId}</td><td>{employee.workingPeriods.map(period => formatDate(period.from) + ' - ' + formatDate(period.to)).join(', ')}</td></tr>
        )
    }

    return (
        <div>
            <h3>Project Participants Information</h3>
            {groupByProject && tableProject()}
        </div>
    )
}

export default ProjectInfo;