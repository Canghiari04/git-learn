import '../css/backNav.css';

import arrow from '../img/arrow.png';

export function BackNav({ text, handleClick }) {    
    return (
        <>
            <div className="div-back-nav">
                <div>
                    <span className="span-press-key">Shift</span>
                    <span className="span-plus"> + </span>
                    <span className="span-press-key">Ctrl</span>
                </div>
                <button className="button-first" onClick={handleClick}>
                    <img src={arrow}/>
                    <span>{text}</span>
                </button>
            </div>
        </>
    );
}