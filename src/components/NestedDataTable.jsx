import React from "react"
import { formatDate } from "../utils/dateUtils"

export function NestedDataTable({data, parentLabel}) {
    function nestedTable() {
        return (
            <table><tbody>{Object.keys(data).map((id, i) => parentRow(data[id], i))}</tbody></table>
        )
    }

    function parentRow(rowData, i) {

        return (
            <React.Fragment key={i}>
                <tr className="heading-row"><td colSpan={2}>{parentLabel} {rowData.id}</td></tr>
                {Object.keys(rowData.children).map((childId, index) => childRow(rowData.children[childId], `${i}_${index}`))}
                
            </React.Fragment>
        )
    }

    function childRow(rowData, index) {

        return (
            <tr key={index}><td>{rowData.id}</td><td>{rowData.workingPeriods.map(period => formatDate(period.from) + ' - ' + formatDate(period.to)).join(', ')}</td></tr>
        )
    }

    return (
        <div>
            {data && nestedTable()}
        </div>
    )
}