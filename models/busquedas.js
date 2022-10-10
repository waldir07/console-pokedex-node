const fs = require("fs");

const axios = require("axios");

class Busquedas {
  historial = [];

  constructor() {
    // TODO: leer Db si existe
  }

  get paramsPoke() {
    return {
      offset: 0,
      limit: 0,
    };
  }

  async pokemon(poke = "") {
    try {
      const instance = axios.create({
        baseURL: `https://pokeapi.co/api/v2/pokemon/${poke}`,
        params: this.paramsPoke,
      });

      const resp = await instance.get();

      const { abilities, name, height, weight, types } = await resp.data;
      return {
        name,
        abilities,
        height,
        weight,
        types,
      };
    } catch (error) {
      return null;
    }
    //peticion http
    //console.log('ciudad: ',lugar);

    return []; //retornar los lugares
  }

  agregarHistorial(poke = "") {
    if (this.historial.includes(poke.toLowerCase())) {
      return;
    }
    this.historial.unshift(poke.toLowerCase());

    //grabar en bd

    this.grabarBdJson();
  }

  grabarBdJson() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync("./db/dataPersist.json", JSON.stringify(payload));
  }

  leerBdJson() {

    if(!fs.existsSync('./db/dataPersist.json')) return null;
    const info = fs.readFileSync('./db/dataPersist.json',{encoding: 'utf8'});
    const data= JSON.parse(info); 
    this.historial = data.historial;
  }

  
}

module.exports = Busquedas;
