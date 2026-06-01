// packages/report-service/src/routes/report.routes.js
const { Router } = require('express')
const { requireRole } = require('../../../../shared/middlewares/auth.middleware')
const controller = require('../controllers/report.controller')

const router = Router()

// Relatório geral da escola — só admin
router.get('/school', requireRole('ADMIN'), controller.getSchoolReport)

// Relatório de uma sala — admin e professor
router.get('/classroom/:classroomId', requireRole('ADMIN', 'TEACHER'), controller.getClassroomReport)

module.exports = router
