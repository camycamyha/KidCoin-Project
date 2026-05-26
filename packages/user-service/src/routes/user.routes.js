const { Router } = require('express')
const { requireRole } = require('../../../../shared/middlewares/auth.middleware')
const controller = require('../controllers/user.controller')

const router = Router()

// Log primeiro
router.use((req, res, next) => {
  console.log('>>> Role recebida:', req.headers['authorization'])
  next()
})

// Professores — só admin gerencia
router.get('/teachers', requireRole('ADMIN'), controller.listTeachers)
router.post('/teachers', requireRole('ADMIN'), controller.createTeacher)

// Alunos — admin e professor listam
router.get('/students', requireRole('ADMIN', 'TEACHER'), controller.listStudents)
router.post('/students', requireRole('ADMIN'), controller.createStudent)

// Usuário específico
router.get('/:id', controller.getUser)
router.put('/:id', requireRole('ADMIN'), controller.updateUser)
router.delete('/:id', requireRole('ADMIN'), controller.deactivateUser)

module.exports = router