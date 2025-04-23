import '../css/progressBar.css';

import { useState } from 'react';

export function ProgressBar({ min, max, currentNumber }) {
    const [prevCount, setPrevCount] = useState(currentNumber);

    if (prevCount !== currentNumber) { 
        setPrevCount(currentNumber);
    }

    return (
        <>
            <div className="div-progress-bar">
                <span>{currentNumber}/{max}</span>
                <progress min={min} max={max} value={currentNumber}></progress>
            </div>
        </>
    );
}