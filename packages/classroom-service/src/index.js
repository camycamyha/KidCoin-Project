const express = require('express')
const { errorMiddleware } = require('../../../shared/middlewares/error.middleware')
const { authMiddleware } = require('../../../shared/middlewares/auth.middleware')
const classroomRoutes = require('./routes/classroom.routes')

const app = express()
const PORT = process.env.PORT || 3003

app.use(express.json())

app.get('/health', (req, res) => res.json({ service: 'classroom-service', status: 'ok' }))

app.use(authMiddleware)
app.use('/', classroomRoutes)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`🏫 Classroom Service rodando na porta ${PORT}`))