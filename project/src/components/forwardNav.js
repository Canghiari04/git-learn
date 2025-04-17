import '../css/forwardNav.css';

import arrow from '../img/arrow.png';

import { Link } from "react-router-dom";

export function ForwardNav({route, text}) {    
    return (
        <>
            <div className="div-forward-nav">
                <div>
                    <span className="span-press-key">Ctrl</span>
                    <span className="span-plus"> + </span>
                    <span className="span-press-key">Enter</span>
                </div>
                <Link to={route}><img src={arrow}/><span>{text}</span></Link>
            </div>
        </>
    );
}