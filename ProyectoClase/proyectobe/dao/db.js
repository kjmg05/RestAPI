const sqlite3 = require('sqlite3');
let db = null;

const initDb = () => {
    return new Promise((accept, reject) => {
        let database = new sqlite3.Database
        (
            //'../data/proyecto.sqlite3', 
            //`../data/${process.env.DB_FILENAME}.sqlite3`,
            `./data/${process.env.DB_FILENAME}.sqlite3`,
            (err) => {
            if(err) {
                console.error(err);
                //process.exit(1);
                reject(err);
            }
            accept(database)
            }
        );
    });
}

//Programacion Basada en Promesa
const singletonGetDB = async () => {
    if(!db){
        db = await initDb();
    }
    return db;
}

//Programacion sin Promesa
const singletonGetDBNoPromise = () => {
    if(!db){
        initDb()
        .then((database) => {db = database;})
        .catch((err) => {throw Error('Error de Base de Datos')});
    }
    return db;
}

module.exports = singletonGetDB;