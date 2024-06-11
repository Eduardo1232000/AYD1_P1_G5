const request = require('supertest');
const app = require('../app');

describe('POST /devolver', () => {
    it('Debería devolver un JSON con mensaje de éxito y un estado 200 si se actualizó correctamente', async () => {
        const response = await request(app)
            .post('/devolver')
            .send({ correo: 'ana.garcia@example.com', titulo: 'Interstellar' });

        expect(response.status).toBe(200);  // Verifica el código de estado
        expect(response.body.success).toBe(true);  // Verifica el campo 'success'
        expect(response.body.message).toBe('Alquiler devuelto exitosamente.');  // Verifica el mensaje
    });

    it('Debería devolver un JSON con mensaje de error y un estado 200 si no se encontró un alquiler activo', async () => {
        const response = await request(app)
            .post('/devolver')
            .send({ correo: 'correo_inexistente@example.com', titulo: 'Título de la película inexistente' });

        expect(response.status).toBe(200);  // Verifica el código de estado
        expect(response.body.success).toBe(false);  // Verifica el campo 'success'
        expect(response.body.message).toBe('No se encontró un alquiler activo para devolver.');  // Verifica el mensaje
    });

    it('Debería devolver un JSON con mensaje de error y un estado 500 si ocurre un error al realizar la actualización', async () => {
        // Simulamos un error al realizar la actualización
        jest.spyOn(pool, 'execute').mockImplementation(() => {
            throw new Error('Error al realizar la actualización');
        });

        const response = await request(app)
            .post('/devolver')
            .send({ correo: 'ana.garcia@example.com', titulo: 'Interstellar' });

        expect(response.status).toBe(500);  // Verifica el código de estado
        expect(response.body.success).toBe(false);  // Verifica el campo 'success'
        expect(response.body.message).toBe('Error al realizar la actualización.');  // Verifica el mensaje
    });
});
