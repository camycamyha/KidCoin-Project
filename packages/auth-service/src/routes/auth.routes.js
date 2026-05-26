// packages/auth-service/src/routes/auth.routes.js
const { Router } = require('express')
const { login, me } = require('../controllers/auth.controller')
const { authMiddleware } = require('@kidcoin/shared/middlewares/auth.middleware')

const router = Router()

router.post('/login', login)
router.get('/me', authMiddleware, me)

module.exports = router
