import _ from "lodash";

import { SubmitForm } from "./submitForm";

export function Signin({ setSwitch, setLogged }) {
    return (
        <>
            <div className="div-container">
                <div className="div-info">
                    <fieldset>
                        <span className="span-info-title">Hai già un account?</span>
                        <span className="span-info-content">Se hai già un account non è necessario iscriverti nuovamente a <span className="span-git">git-learn</span>. Passa alla pagina di accesso e accedi tramite le tue credenziali.</span>
                        <button onClick={setSwitch}>Switch</button>
                    </fieldset>
                </div>
                <div className="div-submit">
                    <span className="span-submit-title">git-learn</span>
                    <span className="span-submit-subtitle">Crea un nuovo account</span>
                    <SubmitForm isSignIn={true} setLogged={setLogged}/>
                </div>
            </div>
        </>
    );
}