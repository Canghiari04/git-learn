import '../css/practice.css';

import Query from '../components/query.js';
import fetcherInstance from '../objects/fetcher.js';

import { GitLearnContext } from '../App.js';
import { Header } from '../components/navbar.js';
import { BackNav } from '../components/backNav.js';
import { useState, useContext, useEffect } from 'react';
import { ForwardNav } from '../components/forwardNav.js';
import { ProgressBar } from '../components/progressBar.js';
import { NavbarStrings, NavStrings } from '../values/strings.js';
import { BackShortCut, ForwardShortCut } from '../utils/shortcut.js';

function PracticePage({ onSelectLanguage }) {
    const language = useContext(GitLearnContext);

    const [count, setCounter] = useState(1);
    const [previousCount, setPreviousCount] = useState(1);

    // States used to display the target query from buffer
    const [query, setQuery] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const [isBackNavVisibility, setBackNavVisibility] = useState(count !== 1);
    const [isForwardNavVisibility, setForwardNavVisibility] = useState(count !== 27);
    
    var navContent = NavStrings[language];
    var navbarContent = NavbarStrings[language];
    
    function decrease() {
        (count <= 1) ? setCounter(1) : setCounter(count - 1);
    }

    function encrease() {
        (count >= 27) ? setCounter(27) : setCounter(count + 1);
    }

    BackShortCut(decrease);
    ForwardShortCut(encrease);

    // Displaying new query from buffer
    function handleQuery(step) {
        const buffer = fetcherInstance.getBuffer();

        // Taking values between buffer's range --> (0, 5), max() and min() are using for that
        const index = Math.max(0, Math.min(currentIndex + step, buffer.length - 1));

        setCurrentIndex(index);
        setQuery(buffer[index]);
    }

    useEffect(() => {
        setPreviousCount(count);

        setBackNavVisibility(count !== 1);
        setForwardNavVisibility(count !== 27);

        // Each time count and previousCount change the buffer is updated
        fetcherInstance.handleBuffer(count, previousCount);

        handleQuery(count - previousCount);
    }, [count]);

    return (
        <>
            <div className="div-practice">
                <Header selectedLanguage={language} content={navbarContent} onChange={onSelectLanguage}/>
                <div className="div-content">
                    <Query title={query.title} corpus={query.corpus} question={query.question} suggestion={query.suggestion}/>
                </div>
                <ProgressBar min={1} max={27} currentNumber={count}/>
                {isBackNavVisibility && <BackNav id="back-nav" text={navContent.link_back} handleClick={() => decrease()}/>}
                {isForwardNavVisibility && <ForwardNav text={navContent.link_forward} handleClick={() => encrease()}/>}
            </div>
        </>
    );
}

export default PracticePage;