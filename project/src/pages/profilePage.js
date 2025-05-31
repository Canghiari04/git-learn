import "../css/profile.css";

import logger from "../objects/logger";

import { Language } from "../utils/context";
import { Login } from "../components/login";
import { useContext, useState } from "react";
import { Signin } from "../components/signin";
import { Navbar } from "../components/navbar";
import { NavbarStrings } from "../values/strings";
import { PersonalArea } from "../components/personalArea";

function ProfilePage() {
    const { language, setLanguage } = useContext(Language);

    const [isLogged, setIsLogged] = useState(logger.checkFromStorage());

    var navbarContent = NavbarStrings[language];

    return (
        <>
            <div className="div-profile">
                <Navbar selectedLanguage={language} content={navbarContent} onChange={setLanguage}/>
                { isLogged ? <PersonalArea setLogged={() => setIsLogged(!isLogged)}/> : <HandlePages setLogged={() => setIsLogged(!isLogged)}/> }
            </div>
        </>
    );
}

function HandlePages({ setLogged }) {
    const [switchPage, setSwitchPage] = useState(true);

    return (
        <>
            <div className="div-content">
                { switchPage ? <Signin setSwitch={() => setSwitchPage(!switchPage)} setLogged={setLogged}/> : <Login setSwitch={() => setSwitchPage(!switchPage)} setLogged={setLogged}/> }
            </div>
        </>
    );
}

export default ProfilePage;