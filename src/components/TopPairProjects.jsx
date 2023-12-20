export function TopPairProjects({projects, fieldName}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Project ID</th>
                    <th>Days</th>
                </tr>
            </thead>
            <tbody>
                {projects.filter(project => project[fieldName] > 0).map(project => {
                    return (
                        <tr>
                            <td>{project.projectId}</td>
                            <td>{project[fieldName]}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}