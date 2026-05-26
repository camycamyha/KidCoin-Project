const { Router } = require('express')
const { requireRole } = require('../../../../shared/middlewares/auth.middleware')
const controller = require('../controllers/activity.controller')

const router = Router()

// Todos listam (filtrado por role no service)
router.get('/', controller.listActivities)
router.get('/:id', controller.getActivity)

// Professor cria e publica
router.post('/', requireRole('TEACHER'), controller.createActivity)
router.patch('/:id/publish', requireRole('TEACHER'), controller.publishActivity)

// Aluno responde
router.post('/:id/submit', requireRole('STUDENT'), controller.submitActivity)

// Progresso do aluno numa sala
router.get('/progress/:classroomId/:studentId', controller.getStudentProgress)

module.exports = router