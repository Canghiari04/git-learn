import '../css/progressBar.css';

export function ProgressBar({min, max, currentNumber}) {
    return (
        <>
            <div className="div-progress-bar">
                <span>{currentNumber}/{max}</span>
                <progress min={min} max={max} value={currentNumber}></progress>
            </div>
        </>
    );
}