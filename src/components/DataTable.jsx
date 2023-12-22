import { useEffect, useState } from "react";
import { formatDate } from "../utils/dateUtils";

export function DataTable ({data}){
    const [filter, setFilter] = useState({});
    const [filteredEmployeeData, setFilteredEmployeeData] = useState([]);
    useEffect(() => {
        const filterDate = filter.date ? Date.parse(filter.date) : null;
        const filteredData = data.filter((value) => {
            if(filter.employeeId && !value.employeeId.toString().includes(filter.employeeId)) {
                return false;
            }

            if(filter.projectId && !value.projectId.toString().includes(filter.projectId)) {
                return false;
            }

            if(filterDate && (filterDate < value.dateFrom || filterDate > value.dateTo)) {
                return false;
            }

            return true;
        });

        setFilteredEmployeeData(filteredData);
    }, [data, filter]);

    function handleFilterChange(event, fieldName) {
        filter[fieldName] = event.target.value.trim();
        setFilter({...filter});
    }

    return (
        <table>
            <thead>
                <tr>
                    <th><input type="number" placeholder="Enter employee ID" onChange={e => handleFilterChange(e, "employeeId")} /></th>
                    <th><input type="number" placeholder="Enter project ID" onChange={e => handleFilterChange(e, "projectId")}/></th>
                    <th colSpan={2}><input type="date" lang="bg-BG" onChange={e => handleFilterChange(e, "date")}/></th>
                </tr>
                <tr>
                    <th>Employee ID</th>
                    <th>Project ID</th>
                    <th>Date From</th>
                    <th>Date To</th>
                </tr>
            </thead>
            <tbody>
                {filteredEmployeeData.map((employeeData, index) => {
                    return (
                        <tr key={index}>
                            <td>{employeeData.employeeId}</td>
                            <td>{employeeData.projectId}</td>
                            <td>{formatDate(employeeData.dateFrom)}</td>   
                            <td>{formatDate(employeeData.dateTo)}</td>
                        </tr>
                    )

                })}
                {filteredEmployeeData.length === 0 && (<tr><td colSpan={4}>No records found</td></tr>)}
            </tbody>
        </table>
    );
}



