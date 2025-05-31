import "../css/personalArea.css";

import logger from "../objects/logger";
import warning from "../img/warning.png";

import { useState, useEffect } from "react";

export function PersonalArea({ setLogged }) {
    const data = logger.getData();

    const [component, setComponent] = useState(<Profile/>);

    return (
        <>
            <div className="div-parent">
                <div className="div-first-column">
                    <fieldset>
                        <span>Ciao {data.name}.</span>
                        <List setLogged={setLogged} setComponent={setComponent}/>
                    </fieldset>
                </div>
                <div className="div-second-column">{component}</div>
            </div>
        </>
    )
}

function List({ setLogged, setComponent }) {
    const [selectedIndex, setSelectedIndex] = useState();

    const items = ["Profilo", "Statistiche", "Zona pericolosa"];
    const ids = ["li-profile", "li-statistics", "li-danger-zone"];

    useEffect(() => {
        const liProfile = document.getElementById("li-profile");
        const liStatistics = document.getElementById("li-statistics");
        const liDangerZone = document.getElementById("li-danger-zone");

        const lis = [liProfile, liStatistics, liDangerZone];

        const selectComponent = (event) => {
            switch (event.target.id) {
                case ("li-profile"):
                    setComponent(<Profile/>);
                    break;
                case ("li-statistics"):
                    setComponent(<Statistics/>);
                    break;
                case ("li-danger-zone"):
                    setComponent(<DangerZone setLogged={setLogged}/>);
                    break;
                default:
                    console.error("Something missing");
            }
        }

        lis.forEach((li) => {
            li.addEventListener("click", selectComponent);
        });

        return () => {
            lis.forEach((li) => {
                li.removeEventListener("click", selectComponent);
            });  
        }        
    }, []);

    return (
        <>
            <ul>
                {
                    items.map((item, index) => (
                        (ids[index] !== "li-danger-zone") 
                        ? <li key={index} id={ids[index]} className={(selectedIndex === index) ? "li-selected" : ""} onClick={() => setSelectedIndex(index)}>{item}</li>
                        : <li key={index} id={ids[index]} className={(selectedIndex === index) ? "li-danger-zone-selected" : "li-danger-zone"} onClick={() => setSelectedIndex(index)}>{item}</li>
                    ))             
                }
            </ul>
        </>
    );
}

function Profile() {
    const data = logger.getData();
    
    const [name, setName] = useState(data.name);
    const [lastname, setLastname] = useState(data.lastname);
    
    const [mail, setMail] = useState(data.mail);
    const [password, setPassword] = useState(data.password);

    const [bool, setBool] = useState(false);

    const handleCancel = () => {
        setName(data.name);
        setLastname(data.lastname);

        setMail(data.mail);
        setPassword(data.password);
    }

    const handleSave = () => {
        logger.saveInStorage(data.id, name, lastname, mail, password);
        logger.update();

        setBool(false);
    }

    useEffect(() => {
        setBool(name !== data.name || lastname !== data.lastname || mail !== data.mail || password !== data.password);
    }, [name, lastname, mail, password]);

    useEffect(() => {        
        const buttonSave = document.getElementById("button-save");
        const buttonCancel = document.getElementById("button-cancel");
        
        const buttons = [buttonSave, buttonCancel];
        buttons.forEach((button) => {
            button.disabled = !bool;
            button.className = (bool) ? button.id : button.id + "-disabled";
        });
    }, [bool]);

    return (
        <>
            <div className="div-badge">
                <span className="span-title">Profilo</span>
                <fieldset>
                    <div>
                        <label>Nome</label><input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div>
                        <label>Cognome</label><input type="text" value={lastname} onChange={(event) => setLastname(event.target.value)}/>
                    </div>
                    <div>
                        <label>Mail</label><input type="text" value={mail} onChange={(event) => setMail(event.target.value)}/>
                    </div>
                    <div>
                        <label>Password</label><input type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div className="div-button">
                        <button id="button-cancel" onClick={handleCancel}>Cancella</button>
                        <button id="button-save" onClick={handleSave}>Salva</button>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

function Statistics() {
    return (
        <>
            <div className="div-statistics">
                <span className="span-title">Statistiche</span>
            </div>
        </>
    );
}

function DangerZone({ setLogged }) {
    const logOut = () => {
        setLogged();
        localStorage.clear();
    }

    return (
        <>
            <div className="div-danger-zone">
                <div>
                    <span><img src={warning} alt="Warning icon"/></span>
                    <span className="span-warning">Zona pericolosa</span>
                </div>
                <fieldset>
                    <span>Disconnessione dall'account</span>
                    <span>Disconnetendoti dal tuo account non perderai alcun dato associato, tutte le tue informazioni e i tuoi progressi sono automaticamente salvati.</span>
                    <button className="button-delete" onClick={logOut}>Esci</button>
                </fieldset>
                <fieldset>
                    <span>Eliminazione dell'account</span>
                    <span>Eliminare il tuo account è permanente ed è irreversibile. I tuoi dati e i tuoi progressi saranno cancellati ad eccezione di alcune informazioni necessarie per obiettivi statistici.</span>
                    <button className="button-delete" onClick={() => logger.delete()}>Elimina account</button>
                </fieldset>
            </div>
        </>
    );
}