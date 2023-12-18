import { useState } from "react";
import { parseEmployeeDataString } from "../utils/dataValidations";
import { useEmployees } from "../hooks/useEmployees";

export function FileBrowser() {
    const { setEmployeesData } = useEmployees();
    const [errors, setErrors] = useState([]);
    function handleFileBrowse(event) {
        const parsingErrors = [];
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = (progressEvent) => {
            let employeeData = [];
            const result = progressEvent.target.result;
            if (result) {
                const lines = result.split(/\r\n|\r|\n/);
                lines.forEach((line, index) => {
                    if (line.trim()) {
                        const parseResult = parseEmployeeDataString(line, index + 1);
                        if (parseResult.errors.length > 0) {
                            parsingErrors.push(...parseResult.errors);
                        } else {
                            employeeData.push(parseResult.data);
                        }
                    }

                });

            } else {
                parsingErrors.push('Empty file loaded');
            }
            setErrors(parsingErrors);
            setEmployeesData(parsingErrors.length > 0 ? [] : employeeData);

        }

    }

    return (
        <div>
            <input type="file" onChange={handleFileBrowse} />
            {errors.map((error, index) => <div key={index}>{error}</div>)}
        </div>

    )
}