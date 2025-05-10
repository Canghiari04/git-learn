import '../css/practice.css';

import Query from '../components/query.js';
import fetcher from '../objects/fetcher.js';

import { GitLearnContext } from '../App.js';
import { Header } from '../components/navbar.js';
import { BackNav } from '../components/backNav.js';
import { ForwardNav } from '../components/forwardNav.js';
import { ProgressBar } from '../components/progressBar.js';
import { useState, useRef, useContext, useEffect } from 'react';
import { NavbarStrings, NavStrings } from '../values/strings.js';
import { BackShortCut, ForwardShortCut } from '../utils/shortcut.js';

function PracticePage({ onSelectLanguage }) {
    const language = useContext(GitLearnContext);
    
    // States used to handle current query, race condition flag and the count saved locally
    const [query, setQuery] = useState([]);
    const [flag, setFlag] = useState(false);
    const [count, setCounter] = useState(() => { return !(JSON.parse(localStorage.getItem("count"))) ? 1 : JSON.parse(localStorage.getItem("count")); });
    
    const [isBackNavVisibility, setBackNavVisibility] = useState(count !== 1);
    const [isForwardNavVisibility, setForwardNavVisibility] = useState(count !== 27);
    
    var navContent = NavStrings[language];
    var navbarContent = NavbarStrings[language];
    
    let previousCount = useRef(0);

    function decrease() {
        previousCount.current = count;
        (count <= 1) ? setCounter(1) : setCounter(count - 1);
    }

    function encrease() {
        previousCount.current = count;
        (count >= 27) ? setCounter(27) : setCounter(count + 1);
    }

    BackShortCut(decrease);
    ForwardShortCut(encrease);

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(count));
    }, [count]);

    useEffect(() => {
        async function initialize() {
            await fetcher.clearBuffer();
            await fetcher.setUpBuffer();

            setFlag(true);
        }

        let buffer = fetcher.getBuffer();
        (buffer.length === 0) ? initialize() : setFlag(true);
    }, []);

    useEffect(() => {
        if (!flag) return;

        async function handleBuffer() {
            setBackNavVisibility(count !== 1);
            setForwardNavVisibility(count !== 27);
            
            // Each time count change I check the buffer
            await fetcher.handleBuffer(count, previousCount.current);
    
            const buffer = fetcher.getBuffer();
            const index = buffer.findIndex((item) => item.id === count);
    
            // Sometimes I use it to see the weird "query is undefined" error
            console.log("Buffer", buffer, "Count", count);

            let query = buffer[index];
            setQuery(query);
        }

        handleBuffer();
    }, [count, flag]);
    
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