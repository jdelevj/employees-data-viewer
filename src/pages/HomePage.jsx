import { useEffect, useState } from "react";
import { DataTable } from "../components/DataTable";
import { FileBrowser } from "../components/FileBrowser";
import { useEmployees } from "../hooks/useEmployees";
import { pairEmployees } from "../utils/dataValidations";
import { TopPair } from "../components/TopPair";

function HomePage() {
    const {employeesData} = useEmployees();
    const [topPairsTogether, setTopPairsTogether] = useState();
    const [topPairsOverall, setTopPairsOverall] = useState();

    useEffect(() => {
        if (employeesData) {
            const pairs = pairEmployees(employeesData);

            setTopPairsTogether(getTopPairs(pairs, "workedTogether"));
            setTopPairsOverall(getTopPairs(pairs, "workedOverall"));
        }
    }, [employeesData]);

    function getTopPairs(pairs, fieldToCompare) {
        return pairs.reduce((acc, pair) => {
            if (acc.length === 0 ) {
                acc.push(pair);
            } else {
                const topPair = acc[0];
                if (topPair[fieldToCompare] === pair[fieldToCompare]) {
                    acc.push(pair);
                } else if (pair[fieldToCompare] > topPair[fieldToCompare]) {
                    acc = [pair];
                }
            }
            return acc;
        }, []);
    }

    return (
        <div>
            <div className="mb-32">
                <FileBrowser />
            </div>            
            {employeesData && (
                <div className="container column mb-32">
                    <div className="title">Employees that worked together the most on the same projects at the same time</div>
                    {topPairsTogether && (
                        (topPairsTogether.length === 0 || topPairsTogether[0].workedTogether === 0) ? (<div className="mb-32">No employees match the criteria</div>) : 
                        (topPairsTogether.map((pair, index) => <TopPair className="mb-32" pair={pair} key={index} fieldName="workedTogether"/>)))}

                    <div className="title">Employees that worked together the most on the same projects</div>
                    {topPairsOverall && (
                        (topPairsOverall.length === 0 || topPairsOverall[0].workedOverall === 0) ? (<div className="mb-32">No employees match the criteria</div>) : 
                        (topPairsOverall.map((pair,index) => <TopPair className="mb-32" pair={pair} key={index} fieldName="workedOverall"/>)))}
                    
                    

                    <DataTable data={employeesData}/>
                </div>
            )}
        </div>
    )
}





export default HomePage;

