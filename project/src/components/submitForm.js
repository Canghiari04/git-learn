import "../css/submitForm.css";

import _ from "lodash";
import logger from "../objects/logger";

import { useState, useEffect } from "react";

const regex_id = new RegExp(/\-(\w+)/);
const regex_mail = new RegExp(/\w.+@(gmail|live|outlook|yahoo|icloud).(it|com)$/);

export function SubmitForm({ isSignIn, setLogged }) {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');

    const [mail, setMail] = useState();
    const [password, setPassword] = useState();

    const checkMailInput = (event) => {
        const input = event.target;

        const isEmpty = _.isEmpty(input.value);
        const isValid = regex_mail.test(input.value);

        var spanMail = document.getElementById("span-mail");
        var spanMailResult = document.getElementById("span-mail-result");

        input.style.background = (isEmpty) ? "#3a3b3d" : "#4a4b50";
            
        if (isEmpty) {
            spanMail.style.color = "red";            
            spanMail.style.fontWeight = "bold";

            spanMailResult.style.display = "flex";
            spanMailResult.innerText = "Inserisci il campo mancante";

            return;
        }
            
        if (isValid) {
            spanMail.style.color = "white";
            spanMail.style.fontWeight = "normal";
            
            spanMailResult.style.display = "none";
        } else {
            spanMail.style.color = "red";
            spanMail.style.fontWeight = "bold";
            
            spanMailResult.style.display = "flex";
            spanMailResult.innerText = "Dettagli errati nel campo email";
        }
    }

    const checkInputEmpty = (event) => {
        const input = event.target;
        const isEmpty = _.isEmpty(input.value);

        var span = document.getElementById("span-" + regex_id.exec(input.id)[1]);
        var spanResult = document.getElementById("span-" + regex_id.exec(input.id)[1] + "-result");

        input.style.background = (isEmpty) ? "#3a3b3d" : "#4a4b50";
        
        if (isEmpty) {
            span.style.color = "red";
            span.style.fontWeight = "bold";

            spanResult.style.display = "flex";
            spanResult.innerText = "Inserisci il campo mancante";
        } else {
            span.style.color = "white";
            span.style.fontWeight = "normal";

            spanResult.style.display = "none";
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const handleSignInSubmit = () => {
            const obj = getEmptySignInFields();

            reportEmptyFields(obj);

            if (Object.values(obj).includes(true)) return;

            if (!regex_mail.test(mail)) return;

            logger.authenticateUser(name, lastname, mail, password).then((bool) => {
                (bool) ? setLogged() : reportWrongCredentials();
            });
        }

        const handleLoginSubmit = () => {
            const obj = getEmptyLoginFields();
            
            reportEmptyFields(obj);
            
            if (Object.values(obj).includes(true)) return;

            logger.authenticateUser(undefined, undefined, mail, password).then((bool) => {
                (bool) ? setLogged() : reportWrongCredentials();
            });
        }

        const getEmptySignInFields = () => {
            return {
                "name": _.isEmpty(name), 
                "lastname": _.isEmpty(lastname), 
                "mail": _.isEmpty(mail), 
                "password": _.isEmpty(password) 
            }
        }

        const getEmptyLoginFields = () => {
            return {
                "mail": _.isEmpty(mail), 
                "password": _.isEmpty(password) 
            }
        }

        const reportEmptyFields = (obj) => {
            for (let property in obj) {
                if (obj[property]) {
                    var span = document.getElementById("span-" + property);
                    var spanResult = document.getElementById("span-" + property + "-result");

                    span.style.color = "red";
                    span.style.fontWeight = "bold";

                    spanResult.style.color = "red";
                    spanResult.style.display = "flex";
                    spanResult.innerText = "Dettagli mancanti";
                }
            }
        }

        const reportWrongCredentials = () => {
            var spanMail = document.getElementById("span-mail");
            var spanMailResult = document.getElementById("span-mail-result");
            
            var spanPassword = document.getElementById("span-password");
            var spanPasswordResult = document.getElementById("span-password-result");

            var spans = [spanMail, spanPassword];
            var spansResult = [spanMailResult, spanPasswordResult];

            spans.forEach((span) => {
                span.style.color = "red";
                span.style.fontWeight = "bold";
            });

            spansResult.forEach((span) => {
                span.style.display = "flex";
                span.innerText = "Credenziali errate";
            });
        }

        (isSignIn) ? handleSignInSubmit() : handleLoginSubmit();
    }

    useEffect(() => {
        let inputMail = document.getElementById("input-mail");
        let inputPassword = document.getElementById("input-password");

        inputMail.addEventListener("input", checkMailInput);
        inputPassword.addEventListener("input", checkInputEmpty);

        return () => {
            inputMail.removeEventListener("input", checkMailInput);
            inputPassword.removeEventListener("input", checkInputEmpty);
        }
    }, [])

    return ( 
        <>
            <form onSubmit={handleSubmit}>
                { isSignIn ? <PersonalField name={name} setName={setName} lastname={lastname} setLastname={setLastname} checkInputEmpty={checkInputEmpty}/> : <></> }
                <fieldset className="field-set-credentials">
                    <legend>Dati di accesso</legend>
                    <span id="span-mail">Mail*</span>
                    <input id="input-mail" type="mail" value={mail} onChange={(event) => setMail(event.target.value)}/>
                    <span id="span-mail-result" className="span-wrong"></span>
                    <span id="span-password">Password*</span>
                    <input id="input-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <span id="span-password-result" className="span-wrong"></span>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

function PersonalField({ name, setName, lastname, setLastname, checkInputEmpty }) {
    useEffect(() => {
        var inputName = document.getElementById("input-name");
        var inputLastname = document.getElementById("input-lastname");

        var inputs = [inputName, inputLastname];
        inputs.forEach((input) => {
            input.addEventListener("input", checkInputEmpty);
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener("input", checkInputEmpty);
            }); 
        }
    }, []);

    return (
        <>
            <fieldset className="field-set-credentials">
                <legend>Dati personali</legend>
                <span id="span-name">Nome*</span>
                <input id="input-name" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                <span id="span-name-result" className="span-wrong"></span>
                <span id="span-lastname">Cognome*</span>
                <input id="input-lastname" type="text" value={lastname} onChange={(event) => setLastname(event.target.value)}/>
                <span id="span-lastname-result" className="span-wrong"></span>
            </fieldset>
        </>
    );
}