const express = require('express')
const { errorMiddleware } = require('../../../shared/middlewares/error.middleware')
const { authMiddleware } = require('../../../shared/middlewares/auth.middleware')
const activityRoutes = require('./routes/activity.routes')

const app = express()
const PORT = process.env.PORT || 3004

app.use(express.json())

app.get('/health', (req, res) => res.json({ service: 'activity-service', status: 'ok' }))

app.use(authMiddleware)
app.use('/', activityRoutes)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`📝 Activity Service rodando na porta ${PORT}`))