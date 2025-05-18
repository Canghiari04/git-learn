import _ from "lodash";
import Parser from "./parser.js";

import { supabaseFactory } from "../utils/singleton";

const client = supabaseFactory.getInstance();

class Fetcher {
    constructor() {
        this.list = [];
    }

    getSize() {
        return this.list.length;
    }

    getQuery(index) {
        return this.list[index - 1];
    }

    getFromStorage() {
        var _list = JSON.parse(localStorage.getItem("list"));

        if (_.isEmpty(_list)) return false;
        
        this.list = _list;
        return true;
    }

    async fetchQuestions() {
        const { data, error } = await client.from("questions").select();

        if (error || _.isEmpty(data)) return;

        var _list = [];
        data.map((item) => {
            let query = new Parser(item.id, item.title, item.corpus, item.question, item.suggestion);
            _list.push(query.record);
        });

        this.list = _list;
        localStorage.setItem("list", JSON.stringify(_list));
    }

    async clearStorage() {
        localStorage.removeItem("list");
    }
}

const fetcher = new Fetcher();

export default fetcher;