export function parseEmployeeDataString(dataString, lineNumber) {
    const parsingErrors = [];

    const tokens = dataString.split(',');
    if (tokens.length !== 4) {
        parsingErrors.push(`Error at line ${lineNumber}: wrong number of columns.`);
        return {
            errors: parsingErrors,
        };
    }

    const employeeId = toInteger(tokens[0]);
    if (!employeeId) {
        parsingErrors.push(`Error at line ${lineNumber}: Wrong Employee ID field.`);
    }

    const projectId = toInteger(tokens[1]);
    if (!projectId) {
        parsingErrors.push(`Error at line ${lineNumber}: Wrong Project ID field.`);
    }

    const dateFrom = toDate(tokens[2]);
    if (!dateFrom) {
        parsingErrors.push(`Error at line ${lineNumber}: Wrong Date From field.`);
    }

    const dateTo = toDate(tokens[3]);
    if (!dateTo) {
        parsingErrors.push(`Error at line ${lineNumber}: Wrong Date To field.`);
    }

    //TODO  Validate overlapping date periods on a single employee working a project
    //TODO  Validation dateTo must be after dateFrom

    return {
        data: { employeeId, projectId, dateFrom, dateTo },
        errors: parsingErrors,
    };
}

function toInteger(str) {
    const result = parseInt(str, 10);
    if (Number.isInteger(+str.trim()) && result > 0) {
        return result;
    }


}

function toDate(str) {
    if (str.trim().toUpperCase() === "NULL") {
        return Date.now();
    } else {
        // TODO: Date parsing.
        const result = Date.parse(str.trim());
        if (!isNaN(result)) {
            return result;
        }
    }
}




