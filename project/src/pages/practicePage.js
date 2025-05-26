import "../css/practice.css";

import Query from "../components/query.js";
import fetcher from "../objects/fetcher.js";
import checker from "../objects/checker.js";

import { Language } from "../utils/context.js";
import { Navbar } from "../components/navbar.js";
import { Loading } from "../components/loading.js";
import { BackNav } from "../components/backNav.js";
import { useState, useContext, useEffect } from "react";
import { ForwardNav } from "../components/forwardNav.js";
import { ProgressBar } from "../components/progressBar.js";
import { NavbarStrings, NavStrings } from "../values/strings.js";
import { BackShortCut, ForwardShortCut } from "../utils/shortcut.js";

function PracticePage() {    
    const { language, setLanguage } = useContext(Language);
    
    const [count, setCounter] = useState(() => {
        return parseInt(localStorage.getItem("count")) || 1; 
    });
    
    const [query, setQuery] = useState();
    const [flag, setFlag] = useState(false);
    const [maxSize, setMaxSize] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isBackNavVisibility, setBackNavVisibility] = useState(count !== 1);
    const [isForwardNavVisibility, setForwardNavVisibility] = useState(count !== 27);
    
    var navContent = NavStrings[language];
    var navbarContent = NavbarStrings[language];
    
    function decrease() {
        (count <= 1) ? setCounter(1) : setCounter(count - 1);
    }

    function encrease() {
        (count >= maxSize) ? setCounter(maxSize) : setCounter(count + 1);
    }

    BackShortCut(decrease);
    ForwardShortCut(encrease);

    useEffect(() => {
        async function initialize() {
            if (fetcher.checkFromStorage()) {
                await fetcher.clearStorage();
                await fetcher.fetchQuestions();
            }

            setMaxSize(fetcher.getSize());
            setFlag(true);
        }
        
        initialize();
    }, []);

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(count));
    }, [count]);

    useEffect(() => {
        if (!flag) return;

        function handleList() {
            let query = fetcher.getQuery(count);

            setBackNavVisibility(count !== 1);
            setForwardNavVisibility(count !== 27);

            setQuery(query);
            setIsLoading(false);
        }

        handleList();
    }, [count, flag]);
    
    return (
        <>
            <div className="div-practice">
                <Navbar selectedLanguage={language} content={navbarContent} onChange={setLanguage}/>
                <div className="div-content">
                    { isLoading ? <Loading/> : <Query title={query.title} corpus={query.corpus} question={query.question} suggestion={query.suggestion}/> }
                </div>
                { !isLoading && <ProgressBar min={1} max={maxSize} currentNumber={count}/> }
                { isBackNavVisibility && <BackNav id="back-nav" text={navContent.link_back} handleClick={() => decrease()}/> }
                { isForwardNavVisibility && <ForwardNav text={navContent.link_forward} handleClick={() => encrease()}/> }
            </div>
        </>
    );
}

export default PracticePage;