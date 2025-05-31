import _ from "lodash";

import { supabaseFactory } from "../utils/singleton";

const client = supabaseFactory.getInstance();

class Logger {
    getData() {
        return {
            "id": localStorage.getItem("id"),
            "name": localStorage.getItem("name"),
            "lastname": localStorage.getItem("lastname"),
            "mail": localStorage.getItem("mail"),
            "password": localStorage.getItem("password")
        }
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
            
            const {data} = await client.from("users").insert({ name: _name, lastname: _lastname, mail: mail, password: password }).select().throwOnError();

            data.map((item) => {
                this.saveInStorage(item.id, item.name, item.lastname, mail, password);
            });        

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
               this.saveInStorage(item.id, item.name, item.lastname, mail, password);
            });        
    
            return true;
        } catch (error) {
            console.log(error.details);
            return false;
        }
    }

    saveInStorage(id, name, lastname, mail, password) {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("mail", mail);
        localStorage.setItem("password", password);
    }

    async update() {
        const data = this.getData();

        try {
            await client.from("users").update({ name: data.name, lastname: data.lastname, mail: data.mail, password: data.password }).eq("id", data.id).throwOnError();
        } catch (error) {
            console.log(error.details);
        }
    }

    async delete() {
        const data = this.getData();

        try {
            await client.from("users").delete().eq("id", data.id).throwOnError();
        } catch (error) {
            console.log(error.details);
        }
    }
}

const logger = new Logger();

export default logger;