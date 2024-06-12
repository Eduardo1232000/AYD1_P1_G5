const request = require('supertest');
const app = require('../app');

describe('GET /comentariosactivos/:titulo', () => {
    it('Debería devolver un JSON con los comentarios activos para un título específico y un estado 200 si se encuentran comentarios', async () => {
        const response = await request(app)
            .get('/comentariosactivos/Inception');

        expect(response.status).toBe(200);
    });
});
