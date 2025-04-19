import '../css/practice.css';

import git from '../img/git.png';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GitLearnContext } from '../App.js';
import { NavStrings } from '../values/strings.js';
import { BackNav } from '../components/backNav.js';
import { ForwardNav } from '../components/forwardNav.js';
import { ProgressBar } from '../components/progressBar.js';
import { BackShortCut, ForwardShortCut } from '../utils/shortcut.js';

function PracticePage({onChange}) {
    const language = useContext(GitLearnContext);

    var navContent = NavStrings[language];

    BackShortCut("/learn");
    ForwardShortCut("");

    return (
        <>
            <div className="div-practice">
                <div className="div-header">
                    <Header selectedLanguage={language} onChange={onChange}/>
                </div>
                <ProgressBar min={0} max={27} currentNumber={1}/>
                <BackNav route={"/learn"} text={navContent.link_back}/>
                <ForwardNav route={""} text={navContent.link_forward}/>
            </div>
        </>
    );
}

function Header({selectedLanguage, onChange}) {
    return (
        <header>
            <Link to="/" className="link-git-learn">git-learn</Link>
            <div>
                <select value={selectedLanguage} onChange={e => onChange(e.target.value)}>
                    <option value="IT">Italiano</option>
                    <option value="EN">English</option>
                </select>
                <a href="https://github.com/Canghiari04/git-learn"><img src={git} alt="Git"/></a>
            </div>
        </header>
    );
}

export default PracticePage;