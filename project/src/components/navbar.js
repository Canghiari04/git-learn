import '../css/navbar.css'

import git from '../img/git.png';

import { Link } from 'react-router-dom';
  
export function Header({selectedLanguage, content, onChange}) {
    return (
        <header>
            <Link to="/" className="link-git-learn">git-learn</Link>
            <div>
                <Link to="/learn">{content.item_1}</Link>
                <LanguageSelector selectedLanguage={selectedLanguage} onChange={onChange}/>
                <a href="https://github.com/Canghiari04/git-learn"><img src={git} alt="Git"/></a>
            </div>
        </header>
    );
}

function LanguageSelector({selectedLanguage, onChange}) {
    return (
      <select value={selectedLanguage} onChange={e => onChange(e.target.value)}>
        <option value="IT">Italiano</option>
        <option value="EN">English</option>
      </select>
    );
}