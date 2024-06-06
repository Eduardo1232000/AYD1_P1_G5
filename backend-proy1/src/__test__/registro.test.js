const request = require('supertest');
const app = require('../app')

describe('POST /register', () => {
    it('Deberia devolver un JSON, un mensaje de que ya existe el usuario y un estado 400', async () => {
        const response = await request(app)
            .post('/register')
            .send({ nombre: 'Eduardo',apellido: 'Reyes',genero:'M', correo: 'eduardo@gmail.com',fecha_nacimiento:'2000-02-28', password: 'Eduardo123'});
        expect(response.body.message).toBe('Usuario ya Existe')
    })
})