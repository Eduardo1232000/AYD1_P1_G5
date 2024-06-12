const request = require('supertest');
const app = require('../app');

describe('POST /alquilarpelicula', () => {
    it('Debería devolver un JSON con mensaje de éxito y un estado 200 si se alquiló correctamente', async () => {
        const response = await request(app)
            .post('/alquilarpelicula')
            .send({ correo: 'juan.perez@example.com', titulo: 'Inception' });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Película alquilada correctamente');
        expect(response.body.devolucion).toBeDefined();
    });
});
