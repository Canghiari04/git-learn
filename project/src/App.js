import HomePage from "./pages/homePage.js";
import LearnPage from "./pages/learnPage.js";
import ProfilePage from "./pages/profilePage.js";
import PracticePage from "./pages/practicePage.js";
import TheoreticalPage from "./pages/theoreticalPage.js";

import { useState, useEffect } from "react";
import { Language } from "./utils/context.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [language, setLanguage] = useState(() => { 
        return localStorage.getItem("language") || "IT"; 
    });

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    return (
        <Language.Provider value={{ language, setLanguage }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/learn" element={<LearnPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/practice" element={<PracticePage/>}/>
                    <Route path="/theoretical" element={<TheoreticalPage/>}/>
                </Routes>
            </BrowserRouter>
        </Language.Provider>
    );
}

export default App;