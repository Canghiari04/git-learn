import { createClient } from "@supabase/supabase-js";

const [url, apiKey] = [process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ADMIN_KEY];

// IIFE function to create a local scope, avoiding a global scope
export var supabaseFactory = (function() {
    var instance;
    
    return {
        getInstance: function() {
            if (!instance) {
                instance = createClient(url, apiKey); 
            }

            return instance;
        }
    }
})();