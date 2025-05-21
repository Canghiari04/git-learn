import _ from "lodash";

import { supabaseFactory } from "../utils/singleton";

const client = supabaseFactory.getInstance();

class Logger {
    getCredentials() {
        return [localStorage.getItem("mail"), localStorage.getItem("password")];
    }

    checkFromStorage() {
        return !(_.isEmpty(localStorage.getItem("mail")) && _.isEmpty(localStorage.getItem("password"))) ? true : false;
    }

    async authenticateUser(name, lastname, mail, password) {
        const { data, error } = await client.from("users").select().eq("mail", mail).eq("password", password);

        if (error || !(_.isEmpty(data))) return false;

        (_.isEmpty(data)) ? this.signIn(name, lastname, mail, password) : this.logIn(mail, password);
    }

    async signIn(name, lastname, mail, password) {
        const { error } = await client.from("users").insert({name: name, lastname: lastname, mail: mail, password: password});

        if (error) return false;

        this.saveInStorage(name, lastname, mail, password);
        return true;
    }

    async logIn(name, lastname, mail, password) {
        const { error, count } = await client.from("users").select('*', { count: "exact", head: true }).eq("mail", mail).eq("password", password);
        
        if (error || count === 0) return false;

        this.saveInStorage(name, lastname, mail, password);
        return true;
    }

    saveInStorage(name, lastname, mail, password) {
        localStorage.setItem("mail", mail);
        localStorage.setItem("name", name);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("password", password);
    }
}

const logger = new Logger();

export default logger;