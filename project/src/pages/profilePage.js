import "../css/profile.css";

import logger from "../objects/logger";

import { Language } from "../utils/context";
import { LogIn } from "../components/logIn";
import { SignIn } from "../components/signIn";
import { Navbar } from "../components/navbar";
import { NavbarStrings } from "../values/strings";
import { useContext, useEffect, useState } from "react";
import { PersonalArea } from "../components/personalArea";

function ProfilePage() {
    const { language, setLanguage } = useContext(Language);

    const [isLogged, setIsLogged] = useState(false);

    var navbarContent = NavbarStrings[language];

    useEffect(() => {
        setIsLogged(logger.checkFromStorage());
    });

    return (
        <>
            <div className="div-profile">
                <Navbar selectedLanguage={language} content={navbarContent} onChange={setLanguage}/>
                { isLogged ? <PersonalArea/> : <HandlePages/> }
            </div>
        </>
    );
}

function HandlePages() {
    const [switchPage, setSwitchPage] = useState(true);

    return (
        <>
            <div className="div-content">
                { switchPage ? <SignIn setState={() => setSwitchPage(!switchPage)}/> : <LogIn setState={() => setSwitchPage(!switchPage)}/> }
            </div>
        </>
    );
}

export default ProfilePage;