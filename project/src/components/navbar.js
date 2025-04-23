import '../css/navbar.css'

import git from '../img/git.png';
import user from '../img/user.png';

import { Link } from 'react-router-dom';
  
export function Header({ selectedLanguage, content, onChange }) {
    return (
        <header>
            <Link to="/" className="link-git-learn">git-learn</Link>
            <div>
                <LanguageSelector selectedLanguage={selectedLanguage} onChange={onChange}/>
                <Link to="/learn">{content.item_1}</Link>
                <a href="https://github.com/Canghiari04/git-learn"><img src={git} alt="Git"/></a>
                <Link to="/personalArea"><img src={user} alt="User"/></Link>
            </div>
        </header>
    );
}

function LanguageSelector({ selectedLanguage, onChange }) {
    return (
      <select value={selectedLanguage} onChange={(e) => onChange(e.target.value)}>
        <option value="IT">Italiano</option>
        <option value="EN">English</option>
      </select>
    );
}