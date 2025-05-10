import _ from 'lodash';
import Parser from './parser.js';

import { supabaseFactory } from '../utils/singleton';

// Constants define buffer's window-range, they can be modified
const min = 1;
const max = 5;
const step = 3;

const client = supabaseFactory.getInstance();

class Fetcher {
    getQuery(index) {
        return JSON.parse(localStorage.getItem("buffer"))[index];
    }

    getBuffer() {
        return JSON.parse(localStorage.getItem("buffer")) || [];
    }

    // Setting up first five question from database, called inside practicePage.js
    async setUpBuffer() {
        client.from("questions").select().gte("id", min).lt("id", max + 1).then(({ data, error }) => {
            if (error || _.isEmpty(data)) return;

            var buffer = [];
            data.map((item) => {
                let query = new Parser(item.id, item.title, item.corpus, item.question, item.suggestion);
                buffer.push(query.record);
            });

            localStorage.setItem("buffer", JSON.stringify(buffer));
        });
    }

    // Handling each time the count and previousCount are changed
    async handleBuffer(count, previousCount) {    
        if (count === 1 || count === 27) return;

        const diff = count - previousCount; 
        const ids = JSON.parse(localStorage.getItem("buffer")).map((item) => item.id);

        // Buffer's items are updated only when the count is positionated at the ends of the object
        if (count !== ids[0] && count !== ids[ids.length - 1]) return;

        var buffer = JSON.parse(localStorage.getItem("buffer"));
        if (diff > 0) {
            client.from("questions").select().gte("id", count + 1).lt("id", count + 3).then(({ data, error }) => {
                if (error || _.isEmpty(data)) return;

                data.map((item) => {
                    let query = (new Parser(item.id, item.title, item.corpus, item.question, item.suggestion)).record;

                    buffer.shift();
                    buffer.push(query);
                });

                localStorage.setItem("buffer", JSON.stringify(buffer));
            });
        } else {
            client.from("questions").select().gte("id", count - step + 1).lt("id", count).then(({ data, error }) => {
                if(error || _.isEmpty(data)) return;

                var _buffer = [];
                data.map((item) => {
                    let query = (new Parser(item.id, item.title, item.corpus, item.question, item.suggestion)).record;

                    buffer.pop();
                    _buffer.push(query);
                });

                localStorage.setItem("buffer", JSON.stringify(_buffer.concat(buffer)));
            });
        }
    }

    clearBuffer() {
        localStorage.clear();
    }
}

const fetcher = new Fetcher();

export default fetcher;