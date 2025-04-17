import '../css/learn.css';

import arrow from "../img/arrow.png";

import { useContext } from 'react'; 
import { GitLearnContext } from '../App.js';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/navbar.js';
import { BackNav } from '../components/backNav.js';
import { NavbarStrings,  LearnStrings, NavStrings } from '../values/strings.js';

function LearnPage({onChange}) {
    const language = useContext(GitLearnContext);
    
    var navbarContent = NavbarStrings[language];
    var learnContent = LearnStrings[language];
    var navContent = NavStrings[language];
    
    var navigate = useNavigate()
    document.addEventListener("keydown", (event) => {
        if (event.shiftKey && event.code === "Enter") {
            navigate("/");
        }
    })
  
    return (
        <>  
            <div className="learn-div">
                <Header selectedLanguage={language} content={navbarContent} onChange={onChange}/>
                <MainContent content={learnContent}/>
            </div>
            <BackNav route={"/"} text={navContent.link_back}/>
        </>
    );
}

function MainContent({content}) {
    return (
        <>
            <div>
                <div className="div-first-child">
                    <div>
                        <span className="span-subtitle">{content.title_1}</span>
                        <span className="span-achievement">0/27</span>
                    </div>
                    <p>{content.content_1}</p>
                    <button>{content.button} <img src={arrow} alt="Arrow icon"/></button>
                </div>
                <div className="div-second-child">
                    <div>
                        <span className="span-subtitle">{content.title_2}</span>
                        <span className="span-achievement">{content.achievement_1}</span>
                    </div>
                    <p>{content.content_2}</p>
                    <button>{content.button} <img src={arrow} alt="Arrow icon"/></button>
                </div>
            </div>
        </>
    );
}

export default LearnPage;