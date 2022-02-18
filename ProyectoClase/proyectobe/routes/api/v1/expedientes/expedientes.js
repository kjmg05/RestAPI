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

module.exports = router;