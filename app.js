require("dotenv").config();
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



const main = async () => {
  const busquedas = new Busquedas();
  
  let dato;

  do {
    dato = await inquirerMenu();

    
    if(dato!==0){
      switch (dato) {
        case 1:
          //mostrar mensaje
  
          const poke = await leerInput("Ingresa el pokemon: ");

          //agregar al historial
          

          const pokedato = await busquedas.pokemon(poke);
          
          if(!pokedato){
            console.log('\nEl pokemón ingresado no existe'.bgRed.bold);
            break;
          }
          busquedas.agregarHistorial(poke);
          
          
          const {name,
            abilities,
            height,
            types,
            weight
              } = pokedato;
          
          
          
          // >>> return abilities, name, height, weight, types;
  
          //buscar los lugares
  
          //seleccionar el lugar
  
          //clima
  
          //mostrar resultados
  
          console.log("\nInformacion del pokemon:\n".green.bold.underline);
          console.log("nombre: ".green.bold, name);
          console.log(`${"Peso:".green.bold}    ${weight/10} kg`);
          console.log(`${"Altura:".green.bold}  ${height/10} m`);
          types.forEach(item => {
            console.log(`tipo(${item.slot}): `.green.bold+item.type.name)
            //console.log(`${'tipo: '.green item.slot':' item.type.name}}`);
          });
          
          abilities.forEach(item => {
            console.log(`habilidad(${item.slot}): `.green.bold+item.ability.name)
            //console.log(`${'tipo: '.green item.slot':' item.type.name}}`);
          });

          
          break;
        case 2:
          const op = busquedas.leerBdJson();
          if(op!==undefined){
            console.log('\nNo existe un historial de pokemones'.bgRed.bold);
            break;
          }
          
        
        
          busquedas.historial.forEach((item,index )=> {
            const idx = `${index+1}`.green
            console.log(idx+`. ${item}`)
          })
          break;
      }

      await pausa();
    }
  } while (dato !== 0);
};

main();
