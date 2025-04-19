import '../css/backNav.css';

import arrow from '../img/arrow.png';

import { Link } from "react-router-dom";

export function BackNav({route, text}) {    
    return (
        <>
            <div className="div-back-nav">
                <div>
                    <span className="span-press-key">Shift</span>
                    <span className="span-plus"> + </span>
                    <span className="span-press-key">Ctrl</span>
                </div>
                <Link to={route}><img src={arrow}/><span>{text}</span></Link>
            </div>
        </>
    );
}