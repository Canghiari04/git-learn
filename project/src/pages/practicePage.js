import '../css/practice.css';

import Parser from '../objects/parser.js';
import Query from '../components/query.js';

import { GitLearnContext } from '../App.js';
import { Header } from '../components/navbar.js';
import { BackNav } from '../components/backNav.js';
import { supabaseFactory } from '../utils/singleton.js';
import { useState, useContext, useEffect } from 'react';
import { ForwardNav } from '../components/forwardNav.js';
import { ProgressBar } from '../components/progressBar.js';
import { NavbarStrings, NavStrings } from '../values/strings.js';
import { BackShortCut, ForwardShortCut } from '../utils/shortcut.js';

function PracticePage({ onSelectLanguage }) {
    const [count, setCounter] = useState(1);
    const language = useContext(GitLearnContext);
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

    const [parsed, setParsed] = useState("");

    // [count] defines the moment when the framework have to render the latest components
    useEffect(() => {
        getTmp();
        setBackNavVisibility(count !== 1);
        setForwardNavVisibility(count !== 27);
    }, [count]);

    async function getTmp() {
        const client = supabaseFactory.getInstance();
        var { data } = await client.from("questions").select().eq("id", count);

        var parsed;
        data.map((d) => {
            parsed = new Parser(d.id, d.title, d.corpus, d.question, d.suggest);
        });
        
        setParsed(parsed.record);
    }

    return (
        <>
            <div className="div-practice">
                <Header selectedLanguage={language} content={navbarContent} onChange={onSelectLanguage}/>
                <div className="div-content">
                    <Query title={parsed.title} corpus={parsed.corpus} question={parsed.question} suggestion={parsed.suggest}/>
                </div>
                <ProgressBar min={1} max={27} currentNumber={count}/>
                {isBackNavVisibility && <BackNav id="back-nav" text={navContent.link_back} handleClick={() => decrease()}/>}
                {isForwardNavVisibility && <ForwardNav text={navContent.link_forward} handleClick={() => encrease()}/>}
            </div>
        </>
    );
}

export default PracticePage;