const celdas = [];
const RETICULA = 8;

let ancho; //alto de celda
let alto;//anchura de celda


const azulejos = [];
const NA = 11; //numero de azulejos

let opcionesI = [];

const reglas = [
  //reglas de los bordes de cada azulejo

  {
    //tile 0
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },
  {
    //tile 1
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },
  {
    //tile 2
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 3
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },
  {
    //tile 4
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 5
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },
  {
    //tile 6
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },
  {
    //tile 7
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },
  {
    //tile 8
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 9
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 10
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },
];

function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage(`azulejos/tile${i}.png`);
  }
}

function setup() {
  createCanvas(1080, 1080);

  ancho = width / RETICULA;
  alto = height / RETICULA;

  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULA * RETICULA; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }


}

function draw() {
  background(0);
  const celdasDisponibles = celdas.filter((celda) => {
    return celda.colapsada == false;
  });

  if (celdasDisponibles.length > 0) {
    celdasDisponibles.sort((a, b) => {
      return a.opciones.length - b.opciones.length;
    });

    const celdasPorColapsar = celdasDisponibles.filter((celda) => {
      return (
        celda.opciones.length == celdasDisponibles[0].opciones.length
      );
    });

    const celdaSeleccionada = random(celdasPorColapsar);
    celdaSeleccionada.colapsada = true;

    const opcionSeleccionada = random(celdaSeleccionada.opciones);
    celdaSeleccionada.opciones = [opcionSeleccionada];



    //print(celdaSeleccionada);


    for (let x = 0; x < RETICULA; x++) {
      for (let y = 0; y < RETICULA; y++) {
        const celdaIndex = x + y * RETICULA;
        const celdaActual = celdas[celdaIndex];
        if (celdaActual.colapsada) {
          const indiceDeAzulejo = celdaActual.opciones[0];
          const reglasActuales = reglas[indiceDeAzulejo]
          print(reglasActuales);
          image(
            azulejos[indiceDeAzulejo],
            x * ancho,
            y * alto,
            ancho,
            alto
          );
          //monitorear UP
          if (y > 0) {
            const indiceUP = x + (y - 1) * RETICULA;
            const celdaUP = celdas[indiceUP];
            if (!celdaUP.colapsada) {
              cambiarEntropia(celdaUP, reglasActuales['UP'], 'DOWN');
            }

          }
          //monitorear RIGHT
          if (x < RETICULA - 1) {
            const indiceRIGHT = (x + 1) + y * RETICULA;
            const celdaRIGHT = celdas[indiceRIGHT];
            if (!celdaRIGHT.colapsada) {
              cambiarEntropia(celdaRIGHT, reglasActuales['RIGHT'], 'LEFT');
            }

          }
          //Monitorear DOWN
          if (y < RETICULA - 1) {
            const indiceDOWN = x + (y + 1) * RETICULA;
            const celdaDOWN = celdas[indiceDOWN];
            if (!celdaDOWN.colapsada) {
              cambiarEntropia(celdaDOWN, reglasActuales['DOWN'], 'UP');
            }

          }
          //Monitorear LEFT
          if (x > 0) {
            const indiceLEFT = (x - 1) + y * RETICULA;
            const celdaLEFT = celdas[indiceLEFT];
            if (!celdaLEFT.colapsada) {
              cambiarEntropia(celdaLEFT, reglasActuales['LEFT'], 'RIGHT');
            }

          }
        } else {
          //strokeWeight(6);
          //rect(x * ancho, y * alto, ancho, alto);
        }
      }
    }
    //noLoop();
  } else {


    for (let i = 0; i < RETICULA * RETICULA; i++) {
      celdas[i] = {
        colapsada: false,
        opciones: opcionesI,
      };
    }
  }
}


function cambiarEntropia(_celda, _regla, _opuesta) {
  const nuevasOpciones = [];
  for (let i = 0; i < _celda.opciones.length; i++) {

    if (_regla == reglas[_celda.opciones[i]][_opuesta]) {

      const celdaCompatible = _celda.opciones[i];
      nuevasOpciones.push(celdaCompatible)

    }
  }
  _celda.opciones = nuevasOpciones;
  print(nuevasOpciones);
}