import '../css/query.css';

import { useEffect, Fragment} from 'react';

// Regular Expression for main contents like suggestion and corpus
const regex_text = new RegExp(/\\textgray{([\-]*\w+[\s]*[\w]+)}/);
const pattern_text = /\\textgray{([\-]*\w+[\s]*[\w]+)}/;

// Regular Expression only for the question part
const regex_question = new RegExp(/\/\/ \\textcmd{(.*?)\}/);
const pattern_question = /\/\/ \\textcmd{(.*?)\}/;

function Query({title, corpus, question, suggestion}) {
    useEffect(() => {
        const prefix = "$ ";
        const textarea = document.getElementById("textarea-answer");

        textarea.value = prefix;

        let index = 0;
        let tokens = new Array();
        let queueCommands = new Array();
        let lockedContent = textarea.value.substring(0, textarea.selectionEnd);
        
        if (!textarea) return
        
        function keyPressed(event) {
            // Getting last cursor position
            const cursorPos = textarea.selectionEnd;

            const actions = {
                "Enter": () => {
                    event.preventDefault();
                    
                    // Saving last command written
                    tokens = textarea.value.split("$ ");
                    queueCommands.push(tokens[tokens.length - 1]);
                    queueCommands = queueCommands.filter((token) => token !== "");

                    // Writing new prefix and saving last changes
                    textarea.value = textarea.value + "\n" + prefix;
                    lockedContent = textarea.value.substring(0, textarea.selectionEnd);

                    index = 0;
                },
                "ArrowUp": () => {
                    event.preventDefault(); 
                    
                    if (index !== queueCommands.length) {
                        let item = queueCommands[(queueCommands.length - 1) - index];
                        textarea.value = lockedContent + item;

                        index++;
                    }
                },
                "ArrowDown": () => {
                    event.preventDefault(); 

                    if (index > 0) {
                        index--;

                        let item = queueCommands[(queueCommands.length - 1) - index];
                        textarea.value = lockedContent + item;
                    }
                },
                "Backspace": () => {
                    // Action denied when the cursor is before the locked content
                    if (cursorPos <= lockedContent.length) {
                        event.preventDefault();
                    }
                }
            }

            if (actions[event.code]) {
                actions[event.code]();
            }
        }

        textarea.addEventListener("keydown", keyPressed);

        return () => {
            textarea.removeEventListener("keydown", keyPressed);
        }
    }, [])

    return (
        <>
            <div className="div-container">
                <div className="div-suggestion">
                    <fieldset>
                        <legend>Suggerimento</legend>
                        <Suggestion text={suggestion}/>
                    </fieldset>
                </div>
                <div className="div-question">
                    <span className="span-title">{title}</span>
                    <Corpus text={corpus}/>
                    <fieldset>
                        <legend>Domanda</legend>
                        <Question text={question}/>
                    </fieldset>
                    <fieldset>
                        <legend>Git</legend>
                        <textarea id="textarea-answer"></textarea>
                    </fieldset>
                </div>
            </div>
        </>
    );
}

function Suggestion({ text=[] }) {
    return (
        <>
            <span className="span-suggestion">
                {text.map((t, index) => (
                    (regex_text.test(t)) ? <span className="span-git" key={index}>{t.match(pattern_text)[1]}</span> : t.replace("}", "")
                ))}
            </span>
        </>
    );
}

function Corpus({ text=[] }) {
    return (
        <>
            <span className="span-corpus">
                {text.map((t, index) => (
                    (regex_text.test(t)) ? <span className="span-git" key={index}>{t.match(pattern_text)[1]}</span> : t.replace("}", "")
                ))}
            </span>
        </>
    );
}

function Question({ text=[] }) {
    return (
        <>
            <span className="span-question">
                {text.map((t, index) => (
                    (regex_question.test(t)) ? (<span className="span-cmd" key={index}>{t.match(pattern_question)[1]}</span>) : (<Fragment key={index}>{t}<br/></Fragment>)
                ))}
            </span>
        </>
    );
}

export default Query;