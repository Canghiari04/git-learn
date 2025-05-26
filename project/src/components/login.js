import "../css/login.css";

import _ from "lodash";

import { SubmitForm } from "./submitForm";

export function Login({ setSwitch, setLogged }) {
    return (
        <>
            <div className="div-container">
                <div className="div-info">
                    <fieldset>
                        <span className="span-info-title">Non hai un account?</span>
                        <span className="span-info-content">Se ancora non hai un account occorre prima registrare le tue credenziali di accesso. Conclusa l'operazione potrai accedere a tutte le funzionalità offerte da <span className="span-git">git-learn</span>.</span>
                        <button onClick={setSwitch}>Switch</button>
                    </fieldset>
                </div>
                <div className="div-submit">
                    <span className="span-submit-title">git-learn</span>
                    <span className="span-submit-subtitle">Accedi con le tue credenziali</span>
                    <SubmitForm isSignIn={false} setLogged={setLogged}/>
                </div>
            </div>
        </>
    );
}