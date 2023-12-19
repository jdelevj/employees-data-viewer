import { useEffect, useState } from "react";
import { DataTable } from "../components/DataTable";
import { FileBrowser } from "../components/FileBrowser";
import { useEmployees } from "../hooks/useEmployees";
import { pairEmployees } from "../utils/dataValidations";

function HomePage() {
    const {employeesData} = useEmployees();
    const [topPairsTogether, setTopPairsTogether] = useState();
    const [topPairsOverall, setTopPairsOverall] = useState();

    useEffect(() => {
        const pairs = pairEmployees(employeesData);
        console.log(pairs);
        const topPairs = pairs.reduce((acc, pair) => {
            if (acc.length === 0 ) {
                acc.push(pair);
            } else {
                const topPair = acc[0];
                if(topPair.workedTogether === pair.workedTogether) {
                    acc.push(pair);
                } else if (pair.workedTogether > topPair.workedTogether) {
                    acc = [pair];
                }
            }
            return acc;
        }, []);
        setTopPairsTogether(topPairs);
    }, [employeesData])

    return (
        <div>
            <h3>I am Home Page</h3>
            <FileBrowser />
            {topPairsTogether && topPairsTogether.map(pair => <TopPair pair={pair}/>)}
            <DataTable data={employeesData}/>
        </div>
    )
}

function TopPair({pair}) {

    return (
        <div>
            <div>
                <div>
                    Employees: {pair.employees.join(', ')} 
                </div>
                <div>
                    Worked together: {pair.workedTogether}
                </div>
            </div>
            <TopPairProjects projects={pair.projects} />
        </div>

    )

}

function TopPairProjects({projects}) {
    return (
        <table>
            <tr>
                <th>Project ID</th>
                <th>Days</th>
            </tr>
            {projects.filter(project => project.workedTogether > 0).map(project => {
                    return (
                        <tr>
                            <td>{project.projectId}</td>
                            <td>{project.workedTogether}</td>
                        </tr>
                    )

                })}
        </table>
    )
}

export default HomePage;

