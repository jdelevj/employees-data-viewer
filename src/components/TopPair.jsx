import { TopPairProjects } from "./TopPairProjects";

export function TopPair({pair, fieldName, className}) {

    return (
        <div className={className}>
            <div>
                <p className="mb-6">
                    <b>Employees:</b> {pair.employees.join(', ')} 
                </p>
                <p className="mb-6">
                    <b>Total time in days:</b> {pair[fieldName]}
                </p>
            </div>
            <TopPairProjects projects={pair.projects} fieldName={fieldName} />
        </div>
    )
}