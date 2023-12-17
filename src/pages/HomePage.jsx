import { DataTable } from "../components/DataTable";
import { FileBrowser } from "../components/FileBrowser";
import { useEmployees } from "../hooks/useEmployees";

function HomePage() {
    const {employeesData} = useEmployees();
    return (
        <div>
            <h3>I am Home Page</h3>
            <FileBrowser />
            <DataTable data={employeesData}/>
        </div>
    )
}

export default HomePage;