import _ from 'lodash';
import Parser from './parser.js';

import { supabaseFactory } from '../utils/singleton';

// Buffer's range, they can be modified
const min = 1;
const max = 5;

const client = supabaseFactory.getInstance();

class Fetcher {
    getBuffer() {
        return JSON.parse(sessionStorage.getItem("buffer"));
    }

    // Setting up first five question from database, called inside learnPage.js
    async setUpBuffer() {
        client.from("questions").select().gte("id", min).lt("id", max + 1).then(({ data, error }) => {
            if (error || _.isEmpty(data)) return;

            var buffer = [];
            data.map((item) => {
                let query = new Parser(item.id, item.title, item.corpus, item.question, item.suggestion);
                buffer.push(query.record);
            });
            
            sessionStorage.setItem("buffer", JSON.stringify(buffer));
        })
    }

    // Handling each time the count and previousCount are changed
    async handleBuffer(count, previousCount) {       
        if (count === 1 || count === 27) return;

        var buffer = JSON.parse(sessionStorage.getItem("buffer"));

        const ids = buffer.map((item) => item.id);

        // Buffer's items are updated only when the count is positionated at the ends of the object
        if (count === ids[0] || count === ids[ids.length - 1]) {
            const diff = count - previousCount;

            client.from("questions").select().eq("id", count + diff).then(({ data, error }) => { 
                if (error || _.isEmpty(data)) return;
                
                data.map((item) => {
                    let query = new Parser(item.id, item.title, item.corpus, item.question, item.suggestion);

                    if (diff > 0) {
                        buffer.shift();
                        buffer.push(query.record);
                    } else {
                        buffer = buffer.slice(0, 2);
                        buffer = buffer.toSpliced(0, 0, query.record);
                    }
                });

                sessionStorage.setItem("buffer", JSON.stringify(buffer));
            });
        } else {
            return;
        }
    }

    clearBuffer() {
        sessionStorage.clear();
    }
}

var fetcherInstance = new Fetcher();

export default fetcherInstance;