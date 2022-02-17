const express = require('express');
const router = express.Router();
const Pacientes = require('../../../../dao/pacientes/pacientes.model');
const pacienteModel = new Pacientes();

//Metodos Validos protocolo RestAPI
/*
router.get();
router.post(); nuevos recurso
router.put(); modificar objetos 
router.delete();
*/

//Uri, del contexto. Funcion, maneja la peticion.
router.get('/', (req, res) => {
    res.status(200).json(
        {
            endpoint: 'Pacientes',
            //updates: new Date(2022, 0, 19, 18, 41, 00),
            author: 'Kenia Martinez',
        }

        );
}); //GET /

router.get('/all', async (req, res) => {
    try {
        const rows = await  pacienteModel.getAll();
        res.status(200).json({status: 'Ok', pacientes: rows});
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 'Failed'});
    }
}); // get all pacientes

// /byid?id=1; no representa recurso unico, /byid/1; representa recurso unico, 
router.get('/byid/:idP', async (req, res) => {
    try {
        const {idP} = req.params;
        const row = await  pacienteModel.getById(idP);
        res.status(200).json({status: 'Ok', paciente: row});
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 'Failed'});
    }
});

/*router.get('/byidandtel/:id/:tel', async (req, res) => {
    try {
        const {id, tel} = req.params;
        const row = {}; //await  pacienteModel.getById(parseInt(id));
        res.status(200).json({status: 'Ok', paciente: row});
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 'Failed'});
    }
});*/

router.post('/new', async(req, res) => {
    const {nombres, apellidos, id, email, telefono} = req.body;
    try{
        rslt = await pacienteModel.new(nombres, apellidos, id, email, telefono);
        res.status(200).json(
        {
            status: 'Ok',
            result: rslt
        });
    } catch(e){
        console.log(e);
        res.status(500).json(
            {
                status: 'Failed', 
                //recieved: {nombres, apellidos, nombreCompleto: `${nombres} ${apellidos}`, id, email, telefono}
                result: {}
            });
    }
}); //POST /new

//Update
router.put('/update/:idP', async(req, res) => {
    try {
        const {nombres, apellidos, id, email, telefono} = req.body;
        const {idP} = req.params;
        const result = await pacienteModel.updateOne(idP, nombres, apellidos, id, email, telefono);
        res.status(200).json(
            {
                status: 'Ok', 
                //recieved: {nombres, apellidos, nombreCompleto: `${nombres} ${apellidos}`, id, email, telefono}
                result
            });
    } catch (e) {
        console.log(e);
        res.status(500).json(
            {
                status: 'Failed', 
                //recieved: {nombres, apellidos, nombreCompleto: `${nombres} ${apellidos}`, id, email, telefono}
                //result: {}
            });
    }
});

//Delete
router.delete('/delete/:idP', async(req, res) => {
    try {
        const {idP} = req.params;
        const rslt = await pacienteModel.deleteOne(idP);
        res.status(200).json(
            {
                status: 'Ok', 
                //recieved: {nombres, apellidos, nombreCompleto: `${nombres} ${apellidos}`, id, email, telefono}
                result: rslt
            });
    } catch (e) {
        console.log(e);
        res.status(500).json(
            {
                status: 'Failed', 
                //recieved: {nombres, apellidos, nombreCompleto: `${nombres} ${apellidos}`, id, email, telefono}
                //result: {}
            });
    }
});

const allowedItemsNumber = [10, 15, 20];

//Facet Search
router.get('/facet/:page/:items', async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);

    if(allowedItemsNumber.includes(items)){
        try {
            const pacientes = await pacienteModel.getFaceted(page, items);
            res.status(200).json({docs:pacientes});
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'Failed',});
        }
    } else {
        return res.status(403).json({status: 'error', msg: 'Not a valid item value (10, 15, 20)'});
    }

});

router.get('/byname/:name/:page/:items', async (req, res) => {
    const name = req.params.name;
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);

    if(allowedItemsNumber.includes(items)){
        try {
            const pacientes = await pacienteModel.getFaceted(page, items, {nombres:name});
            res.status(200).json({docs:pacientes});
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'Failed',});
        }
    } else {
        return res.status(403).json({status: 'error', msg: 'Not a valid item value (10, 15, 20)'});
    }

});

module.exports = router;