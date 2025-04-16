import '../css/learn.css';

import arrow from "../img/arrow.png";

import { useContext } from 'react'; 
import { GitLearnContext } from '../App.js';
import { Header } from '../components/navbar.js';
import { Footer } from '../components/footer.js';
import { NavbarStrings,  LearnStrings } from '../values/strings.js';

function LearnPage({onChange}) {
    const language = useContext(GitLearnContext);

    var navbarContent = NavbarStrings[language];
    var learnContent = LearnStrings[language];
  
    return (
        <>  
            <div className="learn-div">
                <Header selectedLanguage={language} content={navbarContent} onChange={onChange}/>
                <MainContent content={learnContent}/>
            </div>
        </>
    );
}

function MainContent({content}) {
    return (
        <>
            <div>
                <div className="div-first-child">
                    <div>
                        <span className="span-subtitle">Ciao</span>
                        <span className="span-achievement">0/27</span>
                    </div>
                    <p>Puoi imparare le basi di git in questo tutorial.</p>
                    <button>Inizia <img src={arrow} alt="Arrow icon"/></button>
                </div>
                <div className="div-second-child">
                    <div>
                        <span className="span-subtitle">Ciao</span>
                        <span className="span-achievement">0/27</span>
                    </div>
                    <p>Puoi imparare le basi di git in questo tutorial</p>
                    <button>Inizia <img src={arrow} alt="Arrow icon"/></button>
                </div>
            </div>
            <Footer content={content}/>
        </>
    );
}

export default LearnPage;