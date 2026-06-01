// server/index.js
const express = require('express')
const cors = require('cors')
const { authMiddleware } = require('../shared/middlewares/auth.middleware')
const { errorMiddleware } = require('../shared/middlewares/error.middleware')

// Rotas de cada serviço
const authRoutes = require('../packages/auth-service/src/routes/auth.routes')
const userRoutes = require('../packages/user-service/src/routes/user.routes')
const classroomRoutes = require('../packages/classroom-service/src/routes/classroom.routes')
const activityRoutes = require('../packages/activity-service/src/routes/activity.routes')
const coinRoutes = require('../packages/coin-service/src/routes/coin.routes')
const shopRoutes = require('../packages/coin-service/src/routes/shop.routes')

const app = express()
const PORT = process.env.PORT || 3000

// ─── CORS ────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'https://*.vercel.app',
  ],
  credentials: true,
}))

app.use(express.json())

// ─── Log ─────────────────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// ─── Health Check ─────────────────────────
app.get('/health', (req, res) => res.json({
  status: 'ok',
  services: ['auth', 'users', 'classrooms', 'activities', 'coins', 'shop'],
  timestamp: new Date().toISOString(),
}))

// ─── Rotas públicas ───────────────────────
app.use('/auth', authRoutes)

// ─── Auth middleware (protege tudo abaixo) ─
app.use(authMiddleware)

// ─── Rotas protegidas ─────────────────────
app.use('/users', userRoutes)
app.use('/classrooms', classroomRoutes)
app.use('/activities', activityRoutes)
app.use('/coins', coinRoutes)
app.use('/shop', shopRoutes)

// ─── Error Handler ────────────────────────
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`🚀 KidCoin Server rodando em http://localhost:${PORT}`)
  console.log(`   Serviços: auth | users | classrooms | activities | coins | shop`)
})
