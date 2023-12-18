import { useEffect, useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import { formatDate } from "../utils/dateUtils";

function ReDataInfo({ firstParamKey, secondParamKey }) {
    const { employeesData } = useEmployees();
    const [groupByParam, setGroupByParam] = useState(null);

    useEffect(() => {
        const result = employeesData.reduce((acc, record) => {
            let param = acc[record[firstParamKey]];
            if (!param) {
                param = {
                    [firstParamKey]: record[firstParamKey],
                    employees: {},
                    //TODO: pairs
                };

                acc[record[firstParamKey]] = param;
            }

            let employee = param.employees[record[secondParamKey]];
            if (!employee) {
                employee = {
                    [secondParamKey]: record[secondParamKey],
                    workingPeriods: [{ from: record.dateFrom, to: record.dateTo }],
                };
                param.employees[record[secondParamKey]] = employee;
            } else {
                employee.workingPeriods.push({ from: record.dateFrom, to: record.dateTo });
            }

            return acc;
        }, {});

        setGroupByParam(result);
    }, [employeesData, firstParamKey, secondParamKey]);

    function tableParam() {
        return (
            <table>{Object.keys(groupByParam).map(paramKey => paramRow(groupByParam[paramKey]))}</table>
        )
    }

    function paramRow(param) {
        return (
            <>
                <tr><td colSpan={2}>{firstParamKey}: {param[firstParamKey]}</td></tr>
                {Object.keys(param.employees).map((employeeKey) => employeeRow(param.employees[employeeKey]))}
            </>
        )
    }

    function employeeRow(employee) {
        return (
            <tr><td>{employee[secondParamKey]}</td><td>{employee.workingPeriods.map(period => formatDate(period.from) + ' - ' + formatDate(period.to)).join(', ')}</td></tr>
        )
    }

    return (
        <div>
            {groupByParam && tableParam()}
        </div>
    )
}

export default ReDataInfo;
