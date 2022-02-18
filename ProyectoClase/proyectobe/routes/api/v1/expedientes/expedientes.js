const express = require('express');
const router = express.Router();
const Expedientes = require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

//CRUD
//C - create 
router.post('/new', async(req, res) => {
    const {fecha, descripcion, obs, registros, ultimoActualizacion} = req.body;
    try{
        rslt = await expedienteModel.new(fecha, descripcion, obs, registros, ultimoActualizacion);
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
                result: {}
            });
    }
});

//R - read
router.get('/all', async(req, res) => {
    try {
        const rows = await expedienteModel.getAll();
        res.status(200).json({status: 'Ok', expedientes: rows});
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 'Failed'});
    }
});

router.get('/byid/:idE', async(req, res) => {
    try {
        const {idE} = req.params;
        const row = await expedienteModel.getById(idE);
        res.status(200).json({status: 'Ok', expediente: row});
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 'Failed'});
    }
});

//U - update
router.put('/update/:idE', async(req, res) => {
    try {
        const {fecha, descripcion, obs, registros, ultimoActualizacion} = req.body;
        const {idE} = req.params;
        const result = await expedienteModel.updateOne(idE, fecha, descripcion, obs, registros, ultimoActualizacion);
        res.status(200).json(
            {
                status: 'Ok', 
                result
            });
    } catch (e) {
        console.log(e);
        res.status(500).json(
            {
                status: 'Failed',
            });
    }
});

//D - delete
router.delete('/delete/:idE', async(req, res) => {
    try {
        const {idE} = req.params;
        const result = await expedienteModel.deleteOne(idE);
        res.status(200).json(
            {
                status: 'Ok', 
                result
            });
    } catch (e) {
        console.log(e);
        res.status(500).json(
            {
                status: 'Failed',
            });
    }
});

//Facet search
const allowedItemsNumber = [10, 15, 20];
router.get('/facet/:page/:items', async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);

    if(allowedItemsNumber.includes(items)){
        try {
            const expedientes = await expedienteModel.getFaceted(page, items);
            res.status(200).json({docs:expedientes});
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'Failed',});
        }
    } else {
        return res.status(403).json({status: 'error', msg: 'Not a valid item value (10, 15, 20)'});
    }

});

//Tags
router.put('/addtag/:id', async(req, res) => {
    try {
        const {tag} = req.body;
        const {id} = req.params;
        const result = await expedienteModel.updateAddTag(id, tag);
        res.status(200).json(
            {
                status: 'Ok', 
                result
            });
    } catch (e) {
        console.log(e);
        res.status(500).json(
            {
                status: 'Failed', 
            });
    }
});

router.put('/addtagset/:id', async(req, res) => {
    try {
        const {tag} = req.body;
        const {id} = req.params;
        const result = await expedienteModel.updateAddTagSet(id, tag);
        res.status(200).json(
            {
                status: 'Ok', 
                result
            });
    } catch (e) {
        console.log(e);
        res.status(500).json(
            {
                status: 'Failed',
            });
    }
});

//NOT SURE 
/*router.get('/byname/:name/:page/:items', async (req, res) => {
    const name = req.params.name;
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);

    if(allowedItemsNumber.includes(items)){
        try {
            const expedientes = await expedienteModel.getFaceted(page, items, {nombres:name});
            res.status(200).json({docs:expedientes});
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'Failed',});
        }
    } else {
        return res.status(403).json({status: 'error', msg: 'Not a valid item value (10, 15, 20)'});
    }

});*/

module.exports = router;