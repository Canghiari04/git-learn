import '../css/query.css';

import { Fragment } from 'react';

// Regular Expressions for main contents like suggestion and corpus
const regex_text = new RegExp(/\\textgray{([\-]*\w+[\s]*[\w]+)}/);
const pattern_text = /\\textgray{([\-]*\w+[\s]*[\w]+)}/;

// Regular Expression only for the question part
const regex_question = new RegExp(/\/\/ \\textcmd{(.*?)\}/);
const pattern_question = /\/\/ \\textcmd{(.*?)\}/;

function Query({title, corpus, question, suggestion}) {
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
                        <textarea></textarea>
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