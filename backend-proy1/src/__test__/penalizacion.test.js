const request = require('supertest');
const pool = require('../database/db');
const app = require('../app'); // Asegúrate de importar tu aplicación Express correctamente

describe('POST /penalizacion', () => {
  it('Debería devolver el monto de penalización y un mensaje', async () => {
    const testData = {
      correo: 'ana.garcia@example.com',
      titulo: 'Inception'
    };

    const response = await request(app)
      .post('/penalizacion')
      .send(testData)
      .expect('Content-Type', /json/)
      .expect(200);

    // Verifica que la respuesta contenga las propiedades esperadas
    expect(response.body).toHaveProperty('penalizacion');
    expect(response.body).toHaveProperty('mensaje');
    // Puedes agregar más expectativas aquí según la estructura de la respuesta esperada
  });

  it('Debería devolver un mensaje de "Alquiler no encontrado" si no se encuentra el alquiler', async () => {
    const testData = {
      correo: 'ana.garcia@example.com',
      titulo: 'Película Inexistente'
    };

    const response = await request(app)
      .post('/penalizacion')
      .send(testData)
      .expect('Content-Type', /json/)
      .expect(404);

    // Verifica que la respuesta contenga el mensaje esperado y que la penalización sea 0
    expect(response.body).toHaveProperty('message', 'Alquiler no encontrado.');
    expect(response.body).toHaveProperty('penalizacion', 0);
  });

  // Puedes agregar más casos de prueba para manejar otros posibles escenarios
});
