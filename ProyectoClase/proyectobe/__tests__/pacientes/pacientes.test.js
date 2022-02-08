const app = require('../../app');
const supertest = require("supertest");

describe('Test suite de api v1 pacientes endpoint', () => {
    it("GET /api/v1/pacientes/", async () => {
        await supertest(app).get('/api/v1/pacientes').set({apiToken: '5b4476fe-bba6-48ad-ad6a-7511d06b0ab5'}).expect(200);
    });
});