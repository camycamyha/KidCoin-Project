const express = require('express')
const { errorMiddleware } = require('../../../shared/middlewares/error.middleware')
const { authMiddleware } = require('../../../shared/middlewares/auth.middleware')
const userRoutes = require('./routes/user.routes')

const app = express()
const PORT = process.env.PORT || 3002

app.use(express.json())

app.get('/health', (req, res) => res.json({ service: 'user-service', status: 'ok' }))

// Autentica e popula req.user em todas as rotas
app.use(authMiddleware)

app.use('/', userRoutes)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`User Service rodando na porta ${PORT}`))