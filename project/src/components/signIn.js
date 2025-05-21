import "../css/authentication.css";

import _ from "lodash";
import logger from "../objects/logger";

import { useEffect, useRef } from "react";

const regex_mail = new RegExp(/\w.+@(gmail|live|outlook|yahoo|icloud).(it|com)$/);

export function SignIn({ setState }) {
    const _inputName = useRef();
    const _inputSurname = useRef();

    const _spanMail = useRef();
    const _inputMail = useRef();
    const _spanMailResult = useRef();

    const _spanPassword = useRef();
    const _inputPassword = useRef();
    const _spanPasswordResult = useRef();

    function handleInputField(_input) {
        let color = (_input.current.value === "") ? "#3a3b3d" : "#4a4b50";
        _input.current.style.backgroundColor = color;
    }

    function checkMailInput() {
        const isEmpty = _.isEmpty(_inputMail.current.value);
        const isValid = regex_mail.test(_inputMail.current.value);

        if (isEmpty) {
            _spanMail.current.style.color = "red";
            _spanMailResult.current.innerText = "Inserisci la tua email";

            return;
        }

        if (isValid) {
            _spanMail.current.style.color = "white";
            _spanMail.current.style.fontWeight = "normal";

            _spanMailResult.current.innerText = "";
            _spanMailResult.current.style.display = "none";
        } else {
            _spanMail.current.style.color = "red";
            _spanMail.current.style.fontWeight = "bold";

            _spanMailResult.current.style.display = "flex";
            _spanMailResult.current.innerText = "Dettagli errati nel campo email";
        }
    }

    const inputs = [_inputName, _inputSurname, _inputMail, _inputPassword];

    function submit() {
        if (inputs.some((input) => _.isEmpty(input.current.value))) return;

        // I have to define all the checks about the field typed, like:
        // name and lastname have a sense
        // password contains number or special characters
        // and so on
        return;
        
        logger.authenticateUser(_inputName.current.value, _inputSurname.current.value, _inputMail.current.value, _inputPassword.current.value);
    }

    useEffect(() => {
        _spanMailResult.current.style.display = "none"; 
        _spanPasswordResult.current.style.display = "none";        
    }, []);

    return (
        <>
            <div className="div-container">
                <div className="div-info">
                    <fieldset>
                        <span className="span-info-title">Hai già un account?</span>
                        <span className="span-info-content">Se hai già un account non è necessario iscrivirti nuovamente a <span className="span-git">git-learn</span>. Passa alla pagina di accesso e accedi tramite le tue credenziali.</span>
                        <button onClick={setState}>Switch</button>
                    </fieldset>
                </div>
                <div className="div-submit">
                    <span className="span-submit-title">git-learn</span>
                    <span className="span-submit-subtitle">Crea un nuovo account</span>
                    <fieldset className="field-set-credentials">
                        <legend>Dati personali</legend>
                        <span>Nome</span>
                        <input ref={_inputName} onChange={() => handleInputField(_inputName)} type="text"/>
                        <span>Cognome</span>
                        <input ref={_inputSurname} onChange={() => handleInputField(_inputSurname)} type="text"/>
                    </fieldset>
                    <fieldset className="field-set-credentials">
                        <legend>Dati di accesso</legend>
                        <span ref={_spanMail}>Mail*</span>
                        <input ref={_inputMail} onChange={checkMailInput} type="mail"/>
                        <span ref={_spanMailResult} className="span-wrong"></span>
                        <span ref={_spanPassword}>Password*</span>
                        <input ref={_inputPassword} onChange={() => handleInputField(_inputPassword)} type="password"/>
                        <span ref={_spanPasswordResult} className="span-wrong"></span>
                    </fieldset>
                    <button onClick={submit}>Submit</button>
                </div>
            </div>
        </>
    )
}