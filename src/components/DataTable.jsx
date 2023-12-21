import { useEffect, useState } from "react";

export function DataTable ({data}){
    const [filter, setFilter] = useState({});
    const [filteredEmployeeData, setFilteredEmployeeData] = useState([]);
    useEffect(() => {
        const dateFrom = filter.dateFrom ? Date.parse(filter.dateFrom) : null;
        const dateTo = filter.dateTo ? Date.parse(filter.dateTo) : null;
        const filteredData = data.filter((value) => {
            if(filter.employeeId && !value.employeeId.toString().includes(filter.employeeId)) {
                return false;
            }

            if(filter.projectId && !value.projectId.toString().includes(filter.projectId)) {
                return false;
            }

            if(dateFrom && (dateFrom < value.dateFrom || dateFrom > value.dateTo)) {
                return false;
            }

            if(dateTo && (dateTo < value.dateFrom || dateTo > value.dateTo)) {
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
                    <th><input type="date" lang="bg-BG" onChange={e => handleFilterChange(e, "dateFrom")}/></th>
                    <th><input type="date" lang="bg-BG" onChange={e => handleFilterChange(e, "dateTo")}/></th>
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
                            <td>{new Date(employeeData.dateFrom).toLocaleDateString("bg-BG")}</td>   
                            <td>{new Date(employeeData.dateTo).toLocaleDateString("bg-BG")}</td>
                        </tr>
                    )

                })}
            </tbody>
        </table>
    );
}

// TODO fix date format

//TODO Dates for filtering must be  validated 