// gateway/src/index.js
const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')
const { authMiddleware } = require('../../shared/middlewares/auth.middleware')
const { errorMiddleware } = require('../../shared/middlewares/error.middleware')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

// ─── Log de todas as requisições ─────────
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.path}`)
  next()
})

// ─── Health Check ────────────────────────
app.get('/health', (req, res) => res.json({ service: 'gateway', status: 'ok' }))

// ─── Rotas públicas ───────────────────────
app.use('/auth', proxy('http://localhost:3001', {
  proxyReqPathResolver: (req) => req.url
}))

// ─── Auth middleware ──────────────────────
app.use(authMiddleware)

// ─── Proxy com token ──────────────────────
const proxyWithAuth = (url) => proxy(url, {
  proxyReqPathResolver: (req) => req.url,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['Authorization'] = srcReq.headers['authorization']
    return proxyReqOpts
  }
})

app.use('/users',      proxyWithAuth('http://localhost:3002'))
app.use('/classrooms', proxyWithAuth('http://localhost:3003'))
app.use('/activities', proxyWithAuth('http://localhost:3004'))
app.use('/coins',      proxyWithAuth('http://localhost:3005'))
app.use('/shop',       proxyWithAuth('http://localhost:3005'))

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Gateway rodando em http://localhost:${PORT}`)
})