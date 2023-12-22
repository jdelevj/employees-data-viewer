import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="container column" style={{textAlign: "center"}}>
            <h1>404 You folowed an empty link</h1>
            <Link to='/'>You can use some of the upper links.</Link>
        </div>
    )
}