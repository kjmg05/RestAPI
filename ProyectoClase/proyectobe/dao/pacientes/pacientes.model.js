const getDb = require('../mongodb');
let db = null;

class Pacientes {
    collection = null;
    constructor () {
        getDb()
        .then((database) => {
            db = database;
            this.collection = db.collection('Pacientes');
            if(process.env.MIGRATE === 'true'){
                //Por si acaso
            }  
        })
        .catch((err) => {console.error(err)});
    }

    async new (nombres, apellidos, id, email, telefono) {
        const newPaciente = {
            nombres, apellidos, id, email, telefono
        };

        const rslt = await this.collection.insertOne(newPaciente);
        return rslt;
    }



    async getAll () {
        
    }

    async getById(id) {
        
    }

    async updateOne (idP, nombres, apellidos, id, email, telefono) {
        
    }

    async deleteOne (idPaciente) {
        
    }
}

module.exports = Pacientes;