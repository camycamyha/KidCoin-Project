const { Router } = require('express')
const { requireRole } = require('../../../../shared/middlewares/auth.middleware')
const controller = require('../controllers/coin.controller')

const router = Router()

router.get('/balance', requireRole('STUDENT'), controller.getBalance)
router.get('/history', requireRole('STUDENT'), controller.getHistory)

module.exports = router