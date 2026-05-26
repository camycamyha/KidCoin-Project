// packages/auth-service/src/index.js
const express = require('express')
const { errorMiddleware } = require('@kidcoin/shared/middlewares/error.middleware')
const authRoutes = require('./routes/auth.routes')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/health', (req, res) => res.json({ service: 'auth-service', status: 'ok' }))
app.use('/', authRoutes)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Auth Service rodando na porta ${PORT}`))
