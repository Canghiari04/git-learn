import "../css/practice.css";

import Query from "../components/query.js";
import fetcher from "../objects/fetcher.js";
import corrector from "../objects/corrector.js";

import { Language } from "../utils/context.js";
import { Header } from "../components/navbar.js";
import { Loading } from "../components/loading.js";
import { BackNav } from "../components/backNav.js";
import { ForwardNav } from "../components/forwardNav.js";
import { ProgressBar } from "../components/progressBar.js";
import { useState, useRef, useContext, useEffect } from "react";
import { NavbarStrings, NavStrings } from "../values/strings.js";
import { BackShortCut, ForwardShortCut } from "../utils/shortcut.js";

function PracticePage() {    
    const { language, setLanguage } = useContext(Language);
    
    const [count, setCounter] = useState(() => {
        return parseInt(localStorage.getItem("count")) || 1; 
    });
    const [query, setQuery] = useState(() => { 
        return JSON.parse(localStorage.getItem("query")) || ""; 
    });

    const [flag, setFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
        async function initialize() {
            let buffer = fetcher.getBuffer();

            if(buffer.length === 0) {
                await fetcher.clearBuffer();
                await fetcher.setUpBuffer();
            }

            setFlag(true);
            setIsLoading(false);
        }
        
        initialize();
    }, []);

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(count));
    }, [count]);

    useEffect(() => {
        if (!flag) return;

        async function handleBuffer() {
            setIsLoading(true);

            try {
                const buffer =  await fetcher.getBuffer();
                const index = buffer.findIndex((item) => item.id === count);
                
                setBackNavVisibility(count !== 1);
                setForwardNavVisibility(count !== 27);
                
                await fetcher.handleBuffer(count, previousCount.current);

                let query = buffer[index];
                
                localStorage.setItem("query", JSON.stringify(query));
                setQuery(query);
            } catch (error) {
                console.error("Count out of buffer: ", error);
            } finally {
                setIsLoading(false);
            }
        }

        handleBuffer();
    }, [count, flag]);
    
    return (
        <>
            <div className="div-practice">
                <Header selectedLanguage={language} content={navbarContent} onChange={setLanguage}/>
                <div className="div-content">
                    { isLoading ? <Loading/> : <Query title={query.title} corpus={query.corpus} question={query.question} suggestion={query.suggestion}/> }
                </div>
                <ProgressBar min={1} max={27} currentNumber={count}/>
                {isBackNavVisibility && <BackNav id="back-nav" text={navContent.link_back} handleClick={() => decrease()}/>}
                {isForwardNavVisibility && <ForwardNav text={navContent.link_forward} handleClick={() => encrease()}/>}
            </div>
        </>
    );
}

export default PracticePage;