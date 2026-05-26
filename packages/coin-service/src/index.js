const express = require('express')
const { errorMiddleware } = require('../../../shared/middlewares/error.middleware')
const { authMiddleware } = require('../../../shared/middlewares/auth.middleware')
const coinRoutes = require('./routes/coin.routes')
const shopRoutes = require('./routes/shop.routes')

const app = express()
const PORT = process.env.PORT || 3005

app.use(express.json())

app.get('/health', (req, res) => res.json({ service: 'coin-service', status: 'ok' }))

app.use(authMiddleware)
app.use('/', coinRoutes)
app.use('/', shopRoutes)

app.use(errorMiddleware)

app.listen(PORT, () => console.log(`🪙 Coin Service rodando na porta ${PORT}`))