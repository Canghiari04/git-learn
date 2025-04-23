import '../css/forwardNav.css';

import arrow from '../img/arrow.png';

export function ForwardNav({ text, handleClick }) {    
    return (
        <>
            <div className="div-forward-nav">
                <div>
                    <span className="span-press-key">Shift</span>
                    <span className="span-plus"> + </span>
                    <span className="span-press-key">Enter</span>
                </div>
                <button className="button-first" onClick={handleClick}>
                    <span>{text}</span>
                    <img src={arrow}/>
                </button>
            </div>
        </>
    );
}