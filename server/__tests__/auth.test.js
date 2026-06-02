// server/__tests__/auth.test.js
const request = require('supertest')
const express = require('express')
const authRoutes = require('../../packages/auth-service/src/routes/auth.routes')
const { errorMiddleware } = require('../../shared/middlewares/error.middleware')

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)
app.use(errorMiddleware)

describe('Auth Routes', () => {
  describe('POST /auth/login', () => {
    it('deve retornar 400 se email ou senha não forem enviados', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({})
      expect(res.status).toBe(400)
    })

    it('deve retornar 401 com credenciais inválidas', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'naoexiste@teste.com', password: 'senhaerrada' })
      expect(res.status).toBe(401)
    })
  })
})