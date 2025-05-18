import "../css/learn.css";

import arrow from "../img/arrow.png";
import fetcher from "../objects/fetcher.js";

import { useContext } from "react"; 
import { Link } from "react-router-dom";
import { Language } from "../utils/context.js";
import { Header } from "../components/navbar.js";
import { NavbarStrings,  LearnStrings } from "../values/strings.js";

function LearnPage() {
    const { language, setLanguage } = useContext(Language);

    if (!fetcher.getFromStorage()) fetcher.fetchQuestions();

    var learnContent = LearnStrings[language];
    var navbarContent = NavbarStrings[language];
        
    return (
        <>  
            <div className="div-learn">
                <Header selectedLanguage={language} content={navbarContent} onChange={setLanguage}/>
                <MainContent content={learnContent}/>
            </div>
        </>
    );
}

function MainContent({ content }) {
    return (
        <>
            <div>
                <Link to="/practice">
                    <div className="div-first-child">
                        <div>
                            <span className="span-subtitle">{content.title_1}</span>
                            <span className="span-achievement">0/27</span>
                        </div>
                        <p>{content.content_1}</p>
                        <button>{content.button} <img src={arrow} alt="Arrow icon"/></button>
                    </div>
                </Link>
                <Link to="/theoritical">
                    <div className="div-second-child">
                        <div>
                            <span className="span-subtitle">{content.title_2}</span>
                            <span className="span-achievement">{content.achievement_1}</span>
                        </div>
                        <p>{content.content_2}</p>
                        <button>{content.button} <img src={arrow} alt="Arrow icon"/></button>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default LearnPage;