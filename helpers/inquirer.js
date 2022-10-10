const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar un pokemon`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      },
      
    ],
  },
];

const inquirerMenu = async () => {
  //console.clear();
  console.log("=======================".green);
  console.log("=SELECCIONE UNA OPCIÓN=".white);
  console.log("=======================\n".green);

  const  {opcion}  = await inquirer.prompt(preguntas);
  
  return opcion;
};

const pausa = async () => {
  const preguntas = [
    {
      type: "input",
      name: "termino",
      message: `\nPresione ${"Enter".green} para continuar\n`,
    },
  ];

  console.log("\n");
  const termino = await inquirer.prompt(preguntas);
  return termino;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un nombre";
        } else {
          return true;
        }
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async(tareas = []) => {
  
  
  const choices = tareas.map((item,index) => {
    const idx = `${index+1}`.green
    return {
      value: item.id,
      name: `${idx} ${item.desc}`
    }
  });

  choices.unshift({
    value: 0,
    name: `${'0.'.green} cancelar`
  });
  
  const preguntas = [
    {
     type: 'list',
      name: 'id',
      message: '¿Qué tarea borrar?',
      choices
    }
  ];

  const {id} = await inquirer.prompt(preguntas);
  
  return id;
}

const confirmar = async(message) => {
  const preguntas = [
    {
     type: 'confirm',
      name: 'respuesta',
      message
    }
  ];

  const ok = inquirer.prompt(preguntas);
  return ok;
}


const listadocheckList = async( tareas = []) => {
  
  
  const choices = tareas.map((item,index) => {
    const idx = `${index+1}`.green
    return {
      value: item.id,
      name: `${idx} ${item.desc}`,
      checked: (item.completadoEn) ? true : false
    }
  });

  
  
  const preguntas = [
    {
     type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ];

  const {ids} = await inquirer.prompt(preguntas);
  
  return ids;
}


module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  listadocheckList,
};
 