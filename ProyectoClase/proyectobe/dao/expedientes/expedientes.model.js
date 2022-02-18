const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');
let db = null;

class Expedientes {
    collection = null;
    constructor (){
        getDb()
        .then((database) => {
            db = database;
            this.collection = db.collection('Expedientes');
            if(process.env.MIGRATE === 'true'){}
        })
        .catch((err) => {console.error(err)}); 
    }

    //C - Create
    async new (fecha, descripcion, obs, registros, ultimoActualizacion){
        const newExpediente = {
            fecha, descripcion, obs, registros, ultimoActualizacion
        };

        const rslt = await this.collection.insertOne(newExpediente);
        return rslt;
    }

    //R - Read
    async getAll () {
        const cursor = this.collection.find({});
        const documents = await cursor.toArray();
        return documents;
    }

    async getById(idE) {
        const _id = new ObjectId(idE);
        const filter = {_id};
        console.log(filter);
        const myDocument = await this.collection.findOne(filter);
        return myDocument;
    }

    //U - Update
    async updateOne (idE, fecha, descripcion, obs, registros, ultimoActualizacion) {
        const filter = {_id: new ObjectId(idE)};
        const updateCmd = {
        '$set':{
            fecha, descripcion, obs, registros, ultimoActualizacion
        }
        };
        return await this.collection.updateOne(filter, updateCmd);
    }

    //D - Delete
    async deleteOne (idE) {
        const filter = {_id: new ObjectId(idE)};
        
        return await this.collection.deleteOne(filter);
    }

    //Facet 
    /*async getFaceted(page, items, filter = {}) {
        const cursor = this.collection.find(filter);
        const totalItems = await cursor.count();
        cursor.skip((page - 1) * items);
        cursor.limit(items);

        const resultados = await cursor.toArray();
        return {totalItems, page, items, totalPages: (Math.ceil(totalItems/items)), resultados};
    }

    //Adding Tags
    async updateAddTag(idTag, tagEntry) {
        const updateCmd = {
            "$push": {
                tags: tagEntry
            }
        }

        const filter = {_id: new ObjectId(idTag)};
        return await this.collection.updateOne(filter, updateCmd)
    }

    async updateAddTagSet(idTag, tagEntry) {
        const updateCmd = {
            "$addToSet": {
                tags: tagEntry
            }
        }

        const filter = {_id: new ObjectId(idTag)};
        return await this.collection.updateOne(filter, updateCmd)
    }*/
}

module.exports = Expedientes;