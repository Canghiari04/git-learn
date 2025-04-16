import '../css/home.css';

import git from '../img/git.png';

import { useContext } from 'react'; 
import { GitLearnContext } from '../App.js';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/navbar.js';
import { Footer } from '../components/footer.js';
import { NavbarStrings, HomeStrings } from '../values/strings.js';

function HomePage({onChange}) {
  const language = useContext(GitLearnContext);

  var navbarContent = NavbarStrings[language];
  var pageContent = HomeStrings[language];

  return (
    <>
      <div className="home-div">
        <Header selectedLanguage={language} content={navbarContent} onChange={onChange}/>
        <MainContent content={pageContent}/>
        <Footer content={pageContent}/>
      </div>
    </>
  );
}

function MainContent({content}) {
  return (
    <>
      <div>
        <div>
          <span className="span-headline">{content.title_1}</span>
          <span className="span-content">{content.content_1}</span>
          <StartButton text={content.button_1}/>
        </div>
        <div>
        </div>
      </div>
      <div className="div-other-child">
        <div>
        </div>
        <div>
          <span className="span-headline">Open Source</span>
          <span className="span-content"><span>git-learn</span> {content.content_2}</span>
          <form action="https://github.com/Canghiari04/git-learn">
            <button type="submit" className="button-github"><img src={git} alt="git"/>GitHub</button>
          </form>
        </div> 
      </div>
      <div className="div-other-child">
        <div>
          <span className="span-headline">{content.title_3}</span>
          <span className="span-content"><span>Git</span> {content.content_3}</span>
          <form action="https://git-scm.com">
            <button type="submit" className="button-github">{content.button_3}</button>
          </form>
        </div> 
        <div>
        </div>
      </div>
    </>
  );
}

function StartButton({text}) {
  const navigate = useNavigate();
  const handleClick = () => { navigate("/learn") };

  return (
    <>
      <button className="button-start" onClick={handleClick}>{text}</button>
    </>
  );
}

export default HomePage;