const getDb = require('../db');
let db = null;

class Pacientes {
    constructor () {
        getDb()
        .then((database) => {
            db = database;
            if(process.env.MIGRATE === 'true'){
                const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (idPaciente INTEGER PRIMARY KEY AUTOINCREMENT, nombres TEXT, apellidos TEXT, id TEXT, email TEXT, telefono TEXT);';
                db.run(createStatement);
            }  
        })
        .catch((err) => {console.error(err)});
        
    }

    new (nombres, apellidos, id, email, telefono) {
        return new Promise((accept, reject) => {
            db.run(
                'INSERT INTO pacientes (nombres, apellidos, id, email, telefono) VALUES (?, ?, ?, ?, ?);',
                [nombres, apellidos, id, email, telefono],
                (err, rslt) => {
                    if(err){
                        console.error(err);
                        reject(err);
                    }
                    accept(rslt);
                }
            );
        });
    }

    getAll () {
        return new Promise((accept, reject) => {
            db.all('SELECT * FROM pacientes;', (err, rows) => {
                if(err){
                    console.error(err);
                    reject(err);
                }else{
                    accept(rows);
                }
            });
        });
    }

    getById(id) {
        return new Promise((accept, reject) => {
            db.get('SELECT * FROM pacientes WHERE idPaciente=?;', [id],(err, row) => {
                if(err){
                    console.error(err);
                    reject(err);
                }else{
                    accept(row);
                }
            });
        });
    }

    updateOne (idP, nombres, apellidos, id, email, telefono) {
        return new Promise ((accept, reject) => {
            const sqlUpdate = 'UPDATE pacientes SET nombres = ?, apellidos = ?, id = ?, email = ?, telefono = ? WHERE idPaciente = ?;';
            db.run (
                sqlUpdate,
                [nombres, apellidos, id, email, telefono, idP],
                function (err) { //funciones de flecha gorda 
                    if(err){
                        reject(err);
                    } else {
                        accept(this); //resultados de cambios realizados, por eso no se usa funcion de flecha
                    }
                }
            );
        });
    }

    deleteOne (idPaciente) {
        return new Promise ((accept, reject) => {
            const sqlDelete = 'DELETE FROM pacientes WHERE idPaciente = ?;';
            db.run (
                sqlDelete,
                [idPaciente],
                function (err) { //funciones de flecha gorda 
                    if(err){
                        reject(err);
                    } else {
                        accept(this); //resultados de cambios realizados, por eso no se usa funcion de flecha
                    }
                }
            );
        });
    }
}

module.exports = Pacientes;