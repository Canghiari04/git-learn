import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home.js';
import LearnPage from './pages/learnPage.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/learn" element={<LearnPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;