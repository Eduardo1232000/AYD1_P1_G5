const request = require('supertest');
const app = require('../app')

describe('POST /login', () => {
    it('Deberia devolver un JSON, un mensaje exitoso y un estado 200', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'eduardo@gmail.com', password: 'Eduardo123'});
        expect(response.body.message).toBe('Login Correcto')
    })
})