import { useEffect, useRef, useState } from "react";
import { parseEmployeeDataString } from "../utils/dataValidations";
import { useEmployees } from "../hooks/useEmployees";
import "./FileBrowser.css";

export function FileBrowser() {
    const dropTargetRef = useRef();
    const fileInputRef = useRef();

    const { setEmployeesData } = useEmployees();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const dropTargetElement = dropTargetRef.current;

        dropTargetElement.addEventListener('dragover', handleDragOver);
        dropTargetElement.addEventListener('drop', handleDrop);
        dropTargetElement.addEventListener('dragenter', highlight);
        dropTargetElement.addEventListener('dragleave', unhighlight);

        return () => {
            dropTargetElement.removeEventListener('dragover', handleDragOver);
            dropTargetElement.removeEventListener('drop', handleDrop);
            dropTargetElement.removeEventListener('dragenter', handleDragOver);
            dropTargetElement.removeEventListener('dragleave', handleDrop);
        };
    }, []);

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        highlight();
    };

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const files = [...e.dataTransfer.files];
    
        // TODO: validate file extension
        if (files.length > 0) {
            processFile(files[0]);
        }
        unhighlight();
    };

    function highlight() {
        dropTargetRef.current.classList.add("highlight");
    }

    function unhighlight() {
        dropTargetRef.current.classList.remove("highlight");
    }

    function handleFileBrowse(event) {
        const file = event.target.files[0];
        processFile(file);
    }

    function processFile(file) {
        const parsingErrors = [];
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
            setEmployeesData(parsingErrors.length > 0 ? null : employeeData);
        }
    }

    return (
        <div className="file-browser container justify-content-center">
            <div className="drop-target" ref={dropTargetRef}>
                <div>
                    Drag and drop CSV file here or
                </div>
                <button className="button-main" onClick={() => fileInputRef.current.click()}>Browse</button>
                <input className="file-input" type="file" onChange={handleFileBrowse} ref={fileInputRef}/>
            </div>
            <div className="errors">
                {errors.map((error, index) => <div key={index}>{error}</div>)}
            </div>
        </div>
    )
}