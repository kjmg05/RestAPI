const Pacientes = require('../../dao/pacientes/pacientes.model');

describe('Testing Pacientes Model', () => {
    let pacientesModel = undefined;
    let lastId = 0;
    beforeAll((done) => {
        pacientesModel = new Pacientes();
        setTimeout(() => {
            done();
        }, 3000);
    });

    it('pacientesModel Esta definido', () => {
        return expect(pacientesModel).toBeDefined();
    });

    it('getAll Devuelve un array', async () => {
        const arrPacientes = await pacientesModel.getAll();
        return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });

    it('new Guarda dato', async () => {
        const resultado = await pacientesModel.new ('nombres', 'apellidos', 'id', 'email', 'telefono');
        lastId = resultado;
        console.log(resultado);
        return expect(resultado).toBeDefined();
    });
    
    it('getById obtiene un dato', async () => {
        const resultado = await pacientesModel.getById(lastId);
        console.log(resultado);
        return expect(resultado).toBeDefined();
    });

    it('deleteOne elimina un dato', async () => {
        const resultado = await pacientesModel.deleteOne(lastId);
        console.log(resultado);
        return expect(resultado).toBeDefined();
    });
});