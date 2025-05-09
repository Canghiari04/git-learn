const regex_text = /\\textgray{([\-]*\w+[\s]*[\w]+)}/;
const regex_question = /\/\/ \\textcmd{(.*?)\}/;

export default class Parser {
    constructor(id, title, corpus, question, suggestion) {
        this.id = id;
        this.title = title;
        this.corpus = corpus;
        this.question = question;
        this.suggestion = suggestion;
    }

    get record() {
        return this.convertString(); 
    }

    convertString() {
        return {
            id: this.id,
            title: this.title,
            corpus: this.parseText(this.corpus, regex_text),
            question: this.parseQuestion(this.question, regex_question),
            suggestion: this.parseText(this.suggestion, regex_text)
        }
    }

    parseText(text, pattern) {
        // Array contains the text's tokens and regex to find matches
        var tokens = new Array();
        var regex = new RegExp(pattern);

        // Counter
        var i = 0;
        while (regex.test(text)) {
            // Looking for new matches
            var match = text.match(pattern);
            var match_size = match[0].length;
            
            // Take tokens before and after the match
            tokens.push(text.substring(i, match.index));
            tokens.push(text.substring(match.index, match.index + match_size));
            
            // Setting the current position
            i = match.index + match_size;
            
            var substitution = " ".repeat(match_size);
            text = text.replace(match[0], substitution);
        }   

        tokens.push(text.substring(i, text.length));

        return tokens;
    }

    parseQuestion(text, pattern) {
        var tokens = new Array();
        var regex_question = new RegExp(pattern);
    
        var i = 0;
        while (regex_question.test(text)) {
            var match = text.match(pattern);
            var match_size = match[0].length;

            tokens.push(text.substring(i, match.index));
            tokens.push(text.substring(match.index, match.index + match_size));
            
            i = match.index + match_size;
            
            var substitution = " ".repeat(match_size);
            text = text.replace(match[0], substitution);
        }   

        tokens.push(text.substring(i - 1, text.length));

        return tokens;
    }
}