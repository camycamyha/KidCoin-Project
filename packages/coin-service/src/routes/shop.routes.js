const { Router } = require('express')
const { requireRole } = require('../../../../shared/middlewares/auth.middleware')
const controller = require('../controllers/shop.controller')

const router = Router()

// Todos veem a loja
router.get('/', controller.listItems)

// Aluno compra e vê seus itens
router.post('/buy/:itemId', requireRole('STUDENT'), controller.buyItem)
router.get('/my-items', requireRole('STUDENT'), controller.getMyItems)

// Admin adiciona itens na loja
router.post('/', requireRole('ADMIN'), controller.createItem)

module.exports = router