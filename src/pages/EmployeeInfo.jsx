import ReDataInfo from "../components/ReDataInfo";

function EmployeeInfo() {
    return (
        <div>
            <h3>Employee Participation Information</h3>
            <ReDataInfo firstParamKey="employeeId" secondParamKey="projectId" />
        </div>
    )
}

export default EmployeeInfo;