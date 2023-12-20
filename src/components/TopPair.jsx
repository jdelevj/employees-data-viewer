import { TopPairProjects } from "./TopPairProjects";

export function TopPair({pair, fieldName, className}) {

    return (
        <div className={className}>
            <div>
                <div>
                    <b>Employees:</b> {pair.employees.join(', ')} 
                </div>
                <div>
                    <b>Total time in days:</b> {pair[fieldName]}
                </div>
            </div>
            <TopPairProjects projects={pair.projects} fieldName={fieldName} />
        </div>
    )
}