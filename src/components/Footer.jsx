import './Footer.css'

export function Footer() {
    return (
        <footer>
            <div className="container justify-content-center">
                <div>This project is created for Sirma Academy.
                    Educational purposes only.
                </div> 
                <div className='separator'></div>
                <div>
                <a href="mailto:jdelev@gmail.com" ><i className="fa fa-envelope-o" aria-hidden="true"></i>mailto</a>   
                </div>
                <div className='separator'></div>
                <div>
                <a href="https://github.com/jdelevj/employees-data-viewer" target="_blank" rel="noreferrer"><i className="fa fa-github" aria-hidden="true"></i>GitHub</a>
                    
                </div>
            </div>
        </footer>
    )
}