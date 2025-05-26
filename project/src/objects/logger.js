import _ from "lodash";

import { supabaseFactory } from "../utils/singleton";

const client = supabaseFactory.getInstance();

class Logger {
    getData() {
        return [localStorage.getItem("name"), localStorage.getItem("lastname"), localStorage.getItem("mail"), localStorage.getItem("password")];
    }

    checkFromStorage() {
        return !(_.isEmpty(localStorage.getItem("mail")) && _.isEmpty(localStorage.getItem("password"))) ? true : false;
    }

    async authenticateUser(name, lastname, mail, password) {
        try {
            const { data } = await client.from("users").select().eq("mail", mail).eq("password", password).throwOnError();

            const bool = (_.isEmpty(data)) ? await this.signIn(name, lastname, mail, password) : await this.login(mail, password); 

            return bool;
        } catch (error) {
            console.error(error.details);
            return false;
        }
    }

    async signIn(name, lastname, mail, password) {
        try {
            const c1 = await client.from("users").select('*', { count: "exact", head: true }).eq("mail", mail);
            const c2 = await client.from("users").select('*', { count: "exact", head: true }).eq("password", password);
            
            if ( c1.count + c2.count > 0) return false;
            
            const _name =  name[0].toUpperCase() + name.slice(1, name.length).toLowerCase();
            const _lastname = lastname[0].toUpperCase() + lastname.slice(1, lastname.length).toLowerCase();
            
            await client.from("users").insert({name: _name, lastname: _lastname, mail: mail, password: password}).throwOnError();

            this.saveInStorage(name, lastname, mail, password);

            return true;
        } catch(error) {
            console.error(error.details);
            return false;
        }
    }

    async login(mail, password) {
        try {
            const { data } = await client.from("users").select().eq("mail", mail).eq("password", password).throwOnError();
    
            data.map((item) => {
               this.saveInStorage(item.name, item.lastname, mail, password);
            });        
    
            return true;
        } catch (error) {
            console.log(error.details);
            return false;
        }
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