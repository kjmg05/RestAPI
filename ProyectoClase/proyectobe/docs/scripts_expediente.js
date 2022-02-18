require('dotenv').config();
const getDb = require('../dao/mongodb');

const obsE = [
    'Dummy data',
    'Dummy data',
    'Dummy data',
    'Dummy data',
    'Dummy data'
];

const descE = [
    'Dummy data',
    'Dummy data',
    'Dummy data',
    'Dummy data',
    'Dummy data'
];

const expedientes = 2;
const expedienteArray = [];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  

for (let i = 0; i < expedientes; i++) {
    const fecha = (randomDate(new Date(2012, 0, 1), new Date()));
    const ultimoActualizacion = (randomDate(new Date(2022, 0, 1), new Date()));
    const registros = i+1;
    const descripcion = descE[Math.floor(Math.random() * 5)];
    const obs = obsE[Math.floor(Math.random() * 5)];

    const doc = {
        fecha, descripcion, obs, registros, ultimoActualizacion
    };

    expedienteArray.push(doc);
}

getDb().then(
    (db)=>{
      const expedientes = db.collection('Expedientes');
      expedientes.insertMany(expedienteArray, (err, rslts)=>{
        if(err){
          console.log(err);
          return;
        }
        console.log(rslts);
        return;
      });
    }
  );

