import HomePage from './pages/homePage.js';
import LearnPage from './pages/learnPage.js';
import ProfilePage from './pages/profilePage.js';
import PracticePage from './pages/practicePage.js';
import TheoreticalPage from './pages/theoreticalPage.js';

import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const GitLearnContext = createContext();

function App() {
    const [language, setLanguage] = useState("IT");
    
    const handleSetLanguage = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        window.localStorage.setItem("Language", selectedLanguage);
    };

    useEffect(() => {
        if (window.localStorage.getItem("Language")) {
            setLanguage(window.localStorage.getItem("Language"));
        }
    }, [])

    return (
        <GitLearnContext.Provider value={language}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage onSelectLanguage={handleSetLanguage}/>}/>
                    <Route path="/learn" element={<LearnPage onSelectLanguage={handleSetLanguage}/>}/>
                    <Route path="/profile" element={<ProfilePage onSelectLanguage={handleSetLanguage}/>}/>
                    <Route path="/practice" element={<PracticePage onSelectLanguage={handleSetLanguage}/>}/>
                    <Route path="/theoretical" element={<TheoreticalPage onSelectLanguage={handleSetLanguage}/>}/>
                </Routes>
            </BrowserRouter>
        </GitLearnContext.Provider>
    );
}

export default App;