const request = require('supertest');
const pool = require('../database/db');  
const app = require('../app');

describe('POST /devolver', () => {
    it('Debería devolver un JSON con mensaje de éxito y un estado 200 si se actualizó correctamente', async () => {
        const response = await request(app)
            .post('/devolver')
            .send({ correo: 'ana.garcia@example.com', titulo: 'Interstellar' });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Alquiler devuelto exitosamente.');
    });

    it('Debería devolver un JSON con mensaje de error y un estado 200 si no se encontró un alquiler activo', async () => {
        const response = await request(app)
            .post('/devolver')
            .send({ correo: 'correo_inexistente@example.com', titulo: 'Título de la película inexistente' });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('No se encontró un alquiler activo para devolver.');
    });

    it('Debería devolver un JSON con mensaje de error y un estado 500 si ocurre un error al realizar la actualización', async () => {
        // Mockear el comportamiento del pool para simular un error en la actualización
        jest.spyOn(pool, 'execute').mockImplementation(() => {
            return Promise.reject(new Error('Error al realizar la actualización'));
        });

        try {
            const response = await request(app)
                .post('/devolver')
                .send({ correo: 'ana.garcia@example.com', titulo: 'Interstellar' });

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Error al realizar la actualización.');
        } catch (error) {
            throw error;
        }
    });
});
