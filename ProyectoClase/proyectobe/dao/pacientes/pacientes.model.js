const ObjectId = require('mongodb').ObjectId;
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
        const cursor = this.collection.find({});
        const documents = await cursor.toArray();
        return documents;
    }

    async getById(idP) {
        const _id = new ObjectId(idP);
        const filter = {_id};
        console.log(filter);
        const myDocument = await this.collection.findOne(filter);
        return myDocument;
    }

    async updateOne (idP, nombres, apellidos, id, email, telefono) {
        const filter = {_id: new ObjectId(idP)};
        // UPDATE PACIENTES SET campo=valor, campo=valor where id= id;
        const updateCmd = {
        '$set':{
            nombres, apellidos, id, email, telefono
        }
        };
        return await this.collection.updateOne(filter, updateCmd);
    }

    async deleteOne (idP) {
        const filter = {_id: new ObjectId(idP)};
        
        return await this.collection.deleteOne(filter);
    }
}

module.exports = Pacientes;