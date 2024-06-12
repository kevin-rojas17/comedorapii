const axios = require("axios");
module.exports={

    get:async function(nombreAdmin){
        const {data} = await axios.get("http://usuarios_api:8080/usuario/"+nombreAdmin);
        return data[0]; 
    }
}