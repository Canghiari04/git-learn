import HomePage from './pages/homePage.js';
import LearnPage from './pages/learnPage.js';

import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const GitLearnContext = createContext();

function App() {
    const [language, setLanguage] = useState("IT")

    return (
        <GitLearnContext.Provider value={language}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage onChange={setLanguage}/>}/>
                    <Route path="/learn" element={<LearnPage onChange={setLanguage}/>}/>
                </Routes>
            </BrowserRouter>
        </GitLearnContext.Provider>
    );
}

export default App;