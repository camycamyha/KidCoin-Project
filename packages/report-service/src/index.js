// packages/report-service/src/index.js
const express = require('express')
const cors = require('cors')
const { authMiddleware } = require('../../../shared/middlewares/auth.middleware')
const { errorMiddleware } = require('../../../shared/middlewares/error.middleware')
const reportRoutes = require('./routes/report.routes')

const app = express()
const PORT = process.env.PORT || 3006

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}))

app.use(express.json())

app.get('/health', (req, res) => res.json({ service: 'report-service', status: 'ok' }))

app.use(authMiddleware)
app.use('/', reportRoutes)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`📊 Report Service (microserviço) rodando na porta ${PORT}`))
