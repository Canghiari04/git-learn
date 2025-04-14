import './App.css';
import { useState } from 'react';
import git from './images/git.png';

const Languages = {
  "IT": {
    "headline": "Comprendi le funzionalità di git, da zero ad avanzato.",
    "content": "Imparare i comandi git è più semplice di quanto tu possa pensare. Tramite questo strumento avrai l'opportunità di comprendere, imparare e mettere in pratica i concetti alla base di git.",
    "button": "Inizia da qui",
    "open_source": "è un progetto open-source, nato per aiutare nuovi programmatori ad apprendere le basi dei comandi git in maniera interattiva. Contribuire a questo progetto potrebbe aiutarti a acquisire nuove competenze oppure di affinare le tue capacità. Le main resources sono accessibili dal repository pubblico indicato qui sotto.",
  },
  "EN": {
    "headline": "Discover git functionality, from zero to hero.",
    "content": "Learning git commands is easier than you think. Through this web site you will have the chance to understand, learn and do some stuff by basic concepts of git.",
    "button": "Start here",
    "open_source": "is a open-source project, that help new developers to understand the concepts about git comands in a interactive way. Contributing on this project allows you to achieve new abilities or to enhance new capacities. Main resources are available by the public repository shows below.",
  }
}

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
        <LanguageSelector selectedLanguage={selectedLanguage} onChange={setSelectedLanguage}/>
        <a href="https://github.com/Canghiari04/git-learn"><img src={git} alt="git"/></a>
      </div>
    </header>
  );
}

function StartButton({text}) {
  return (
    <button>{text}</button>
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
          <img></img>
        </div>
      </div>
      <div className="div-other-child">
        <div>
          <img></img>
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
          <span className="span-headline"></span>
          <span className="span-content"></span>
          <StartButton text={content.button}/>
        </div> 
        <div>
          <img></img>
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

function App() {
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

export default App;