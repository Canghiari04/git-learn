import '../css/practice.css';

import { GitLearnContext } from '../App.js';
import { useState, useContext } from 'react';
import { Header } from '../components/navbar.js';
import { BackNav } from '../components/backNav.js';
import { ForwardNav } from '../components/forwardNav.js';
import { ProgressBar } from '../components/progressBar.js';
import { NavbarStrings, NavStrings } from '../values/strings.js';
import { BackShortCut, ForwardShortCut } from '../utils/shortcut.js';

function PracticePage({ onSelectLanguage }) {
    const language = useContext(GitLearnContext);
    const [count, setCounter] = useState(1);

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

    return (
        <>
            <div className="div-practice">
                <Header selectedLanguage={language} content={navbarContent} onChange={onSelectLanguage}/>
                <div className="div-content">
                    <span className="span-title">Title</span>
                    <span className="span-content"></span>
                    <span className="span-question"></span>
                    <span className="span-answer"></span>
                </div>
                <ProgressBar min={0} max={27} currentNumber={count}/>
                <BackNav text={navContent.link_back} handleClick={() => decrease()}/>
                <ForwardNav text={navContent.link_forward} handleClick={() => encrease()}/>
            </div>
        </>
    );
}

export default PracticePage;