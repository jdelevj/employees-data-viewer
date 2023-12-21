import { formatDate } from "../utils/dateUtils"

export function NestedDataTable({data, parentLabel}) {
    function nestedTable() {
        return (
            <table><tbody>{Object.keys(data).map((id, i) => parentRow(data[id], i))}</tbody></table>
        )
    }

    function parentRow(rowData, i) {

        return (
            <>
                <tr className="heading-row" key={i}><td colSpan={2}>{parentLabel} {rowData.id}</td></tr>
                {Object.keys(rowData.children).map((childId, index) => childRow(rowData.children[childId], `${i}_${index}`))}
                
            </>
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