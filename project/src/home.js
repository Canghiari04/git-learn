import './css/home.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import git from './img/git.png';
import Languages from './values/strings.js';

function LanguageSelector({selectedLanguage, onChange}) {
  return (
    <select value={selectedLanguage} onChange={e => onChange(e.target.value)}>
      <option value="IT">Italiano</option>
      <option value="EN">English</option>
    </select>
  );
}

function Header({selectedLanguage, setSelectedLanguage}) {
  return (
    <header className="home-header">
      <span className="span-git-learn">git-learn</span>
      <div>
        <span>Learn</span>
        <LanguageSelector selectedLanguage={selectedLanguage} onChange={setSelectedLanguage}/>
        <a href="https://github.com/Canghiari04/git-learn"><img src={git} alt="Git"/></a>
      </div>
    </header>
  );
}

function StartButton({text}) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/learn")
  }

  return (
    <button id="button-start" onClick={handleClick}>{text}</button>
  )
}

function MainContent({content}) {
  return (
    <>
      <div className="div-first-child">
        <div>
          <span className="span-headline">{content.headline}</span>
          <span className="span-content">{content.content}</span>
          <StartButton text={content.button}/>
        </div>
        <div>
        </div>
      </div>
      <div className="div-other-child">
        <div>
        </div>
        <div>
          <span className="span-headline">Open Source</span>
          <span className="span-content"><span>git-learn</span> {content.open_source}</span>
          <form action="https://github.com/Canghiari04/git-learn">
            <button type="submit" className="button-github"><img src={git} alt="git"/>GitHub</button>
          </form>
        </div> 
      </div>
      <div className="div-other-child">
        <div>
          <span className="span-headline">{content.git_headline}</span>
          <span className="span-content"><span>Git</span> {content.git_content}</span>
          <StartButton text={content.button}/>
        </div> 
        <div>
        </div>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer>
      <p>An idea by <a href="https://github.com/Canghiari04"><span>Matteo Canghiari</span></a></p>
    </footer>
  )
}

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("IT");
  var content = Languages[selectedLanguage]

  return (
    <>
      <div className="home">
        <Header selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
        <MainContent content={content}/>
        <Footer/>
      </div>
    </>
  );
}

export default Home;