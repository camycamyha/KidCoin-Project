const { Router } = require('express')
const { requireRole } = require('../../../../shared/middlewares/auth.middleware')
const controller = require('../controllers/classroom.controller')

const router = Router()

// Todos os perfis listam (filtrado por role no service)
router.get('/', controller.listClassrooms)

// Detalhes de uma sala
router.get('/:id', controller.getClassroom)

// Criar sala — professor e admin
router.post('/', requireRole('ADMIN', 'TEACHER'), controller.createClassroom)

// Gerenciar alunos — professor e admin
router.post('/:id/students', requireRole('ADMIN', 'TEACHER'), controller.addStudent)
router.delete('/:id/students/:studentId', requireRole('ADMIN', 'TEACHER'), controller.removeStudent)

module.exports = router