import { formatDate } from "../utils/dateUtils"

export function NestedDataTable({data, parentLabel}) {
    function nestedTable() {
        return (
            <table>{Object.keys(data).map(id => parentRow(data[id]))}</table>
        )
    }

    function parentRow(rowData) {
        return (
            <>
                <tr className="heading-row"><td colSpan={2}>{parentLabel} {rowData.id}</td></tr>
                {Object.keys(rowData.children).map((childId) => childRow(rowData.children[childId]))}
            </>
        )
    }

    function childRow(rowData) {
        return (
            <tr><td>{rowData.id}</td><td>{rowData.workingPeriods.map(period => formatDate(period.from) + ' - ' + formatDate(period.to)).join(', ')}</td></tr>
        )
    }

    return (
        <div>
            {data && nestedTable()}
        </div>
    )
}