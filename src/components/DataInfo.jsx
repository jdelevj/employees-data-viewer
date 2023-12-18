import { useEffect, useState } from "react";
import { useEmployees } from "../hooks/useEmployees";

function DataInfo() {
    const { employeesData } = useEmployees();
    const [groupByDataID, setGroupByDataID] = useState(null);
    useEffect(() => {
        const result = employeesData.reduce((acc, record) => {
            let secondParam = acc[record.secondParamId];
            if (!secondParam) {
                secondParam = {
                    secondParamId: record.secondParamId,
                    employees: {},                  //
                    //TODO: pairs
                };

                acc[record.secondParamId] = secondParam;
            }

            let firstParam = secondParam.employees[record.firstParamId];
            if (!firstParam) {
                firstParam = {
                    firstParamId: record.firstParamId,
                    workingPeriods: [{ from: record.dateFrom, to: record.dateTo }],
                };
                secondParam.employees[record.firstParamId] = firstParam;
            } else {
                firstParam.workingPeriods.push({ from: record.dateFrom, to: record.dateTo });
            }

            return acc;
        }, {})

        setGroupByDataID(result);
    }, [employeesData]);

    function tableInfo() {
        return (
            <table>{Object.keys(groupByDataID).map(secondParamId => secondParamRow(groupByDataID[secondParamId]))}</table>
        )
    }

    function secondParamRow(secondParam) {
        return (
            <>
                <tr><td colSpan={2}>Project ID: {secondParam.secondParamId}</td></tr> 
                {Object.keys(secondParam.employees).map((firstParamId) => employeeRow(secondParam.employees[firstParamId]))}
            </>
        )
    }
    
    function firstParamRow(firstParam) {
        return (
            <tr><td>{firstParam.firstParamId}</td><td>{firstParam.workingPeriods.map(period => formatDate(period.from) + ' - ' + formatDate(period.to)).join(', ')}</td></tr>
        )
    }

    return (
        <div>
            {groupByDataID && tableInfo()}
        </div>
    )
}

export default DataInfo;