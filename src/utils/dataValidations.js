const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

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

export function nestedGrouping(data, firstKey, secondKey) {
    return  data.reduce((acc, record) => {
        let parent = acc[record[firstKey]];
        if (!parent) {
            parent = {
                id: record[firstKey],
                children: {},
            };

            acc[record[firstKey]] = parent;
        }

        let child = parent.children[record[secondKey]];
        if (!child) {
            child = {
                id: record[secondKey],
                workingPeriods: [{ from: record.dateFrom, to: record.dateTo }],
            };
            parent.children[record[secondKey]] = child;
        } else {
            child.workingPeriods.push({ from: record.dateFrom, to: record.dateTo });
        }

        return acc;
    }, {});
}

export function pairEmployees(employeesData) {
    const groupByEmployee = nestedGrouping(employeesData, 'employeeId', 'projectId');
    const employeeIds = Object.keys(groupByEmployee);
    const pairs = [];
    for (let i = 0; i < employeeIds.length; i++) {
        const firstEmployee = groupByEmployee[employeeIds[i]];
        for (let j = i + 1; j < employeeIds.length; j++) {
            const secondEmployee = groupByEmployee[employeeIds[j]];
            const workingDaysOnProjects = sumWorkingDaysOnProjects(firstEmployee.children, secondEmployee.children);
            const workedTogether = workingDaysOnProjects.reduce((sum, project) => {
                sum += project.workedTogether;
                return sum;
            }, 0);

            const workedOverall = workingDaysOnProjects.reduce((sum, project) => {
                sum += project.workedOverall;
                return sum;
            }, 0);

            const pair = {
                employees: [firstEmployee.id, secondEmployee.id],
                workedTogether,
                workedOverall,
                projects: workingDaysOnProjects,
            };
            pairs.push(pair);

        }
        
    }
    return pairs;
}

function sumWorkingDaysOnProjects(firstEmployeeProjects, secondEmployeeProjects) {
    const projects = [];
    const projectIds = Object.keys(firstEmployeeProjects);
    for (let i = 0; i < projectIds.length; i++) {
        const projectId = projectIds[i];
        const secondEmployeeProject = secondEmployeeProjects[projectId];
        if (secondEmployeeProject) {
            const firstEmployeeProject = firstEmployeeProjects[projectId];
            const projectRecord = {
                projectId,
                workedTogether: workingPeriodsOverlappedDays(firstEmployeeProject.workingPeriods, secondEmployeeProject.workingPeriods), 
                workedOverall: workingPeriodsOverallDays(firstEmployeeProject.workingPeriods) + workingPeriodsOverallDays(secondEmployeeProject.workingPeriods),
            };
            projects.push(projectRecord);
        }
        
    }
    return projects;
}

function workingPeriodsOverlappedDays(firstPeriods, secondPeriods) {
    let result = 0;
    for (const firstPeriod of firstPeriods) {
        for (const secondPeriod of secondPeriods) {   
            const overlappingPeriod = periodsOverlap(firstPeriod, secondPeriod);
            if(overlappingPeriod) {
                result += dateDiffInDays(overlappingPeriod.from, overlappingPeriod.to);
            } 

        }
    } 
    return result;
}

function periodsOverlap(firstPeriod, secondPeriod) {
    if((firstPeriod.to < secondPeriod.from) || (firstPeriod.from > secondPeriod.to)) {
        return null;
    } 
    return {
        from: Math.max(firstPeriod.from, secondPeriod.from),
        to: Math.min(firstPeriod.to, secondPeriod.to),
    };
}

function workingPeriodsOverallDays(periods) {
    let result = 0;
    for (const period of periods) {
        result += dateDiffInDays(period.from, period.to);       
    }
    return result;
}

function dateDiffInDays(from, to) {
    const diffTime = to - from;

    return Math.ceil(diffTime / MILLISECONDS_PER_DAY);
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



