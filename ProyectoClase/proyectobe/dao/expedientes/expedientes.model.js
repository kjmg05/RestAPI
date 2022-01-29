const getDb = require('../db');
let db = null;

class Expedientes {
    constructor (){
        getDb()
        .then((database) => {
            db = database;
            if(process.env.MIGRATE === 'true'){
                const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT, descripcion TEXT, obs TEXT, registros TEXT, ultimoActualizacion TEXT);';
                db.run(createStatement);
            }
        })
        .catch((err) => {console.error(err)}); 
    }

    new (fecha, descripcion, obs, registros, ultimoActualizacion){
        return new Promise ((accept, reject) => {
            db.run(
                'INSERT INTO expedientes (fecha, descripcion, obs, registros, ultimoActualizacion) VALUES (?, ?, ?, ?, ?);',
                [fecha, descripcion, obs, registros, ultimoActualizacion],
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
            db.all('SELECT * FROM expedientes;', (err, rows) => {
                if(err){
                    console.error(err);
                    reject(err);
                }else{
                    accept(rows);
                }
            });
        });
    }

    getById(idE) {
        return new Promise((accept, reject) => {
            db.get('SELECT * FROM expedientes WHERE id=?;', [idE],(err, row) => {
                if(err){
                    console.error(err);
                    reject(err);
                }else{
                    accept(row);
                }
            });
        });
    }

    updateOne (id, fecha, descripcion, obs, registros, ultimoActualizacion) {
        return new Promise ((accept, reject) => {
            const sqlUpdate = 'UPDATE expedientes SET fecha = ?, descripcion = ?, obs = ?, registros = ?, ultimoActualizacion = ? WHERE id = ?;';
            db.run (
                sqlUpdate,
                [fecha, descripcion, obs, registros, ultimoActualizacion, id],
                function (err) { 
                    if(err){
                        reject(err);
                    } else {
                        accept(this); 
                    }
                }
            );
        });
    }

    deleteOne (idE) {
        return new Promise ((accept, reject) => {
            const sqlDelete = 'DELETE FROM expedientes WHERE id = ?;';
            db.run (
                sqlDelete,
                [idE],
                function (err) { 
                    if(err){
                        reject(err);
                    } else {
                        accept(this); 
                    }
                }
            );
        });
    }
}

module.exports = Expedientes;