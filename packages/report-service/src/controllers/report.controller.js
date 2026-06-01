// packages/report-service/src/controllers/report.controller.js
const reportService = require('../services/report.service')

async function getSchoolReport(req, res, next) {
  try {
    const report = await reportService.getSchoolReport(req.user.schoolId)
    res.json(report)
  } catch (err) { next(err) }
}

async function getClassroomReport(req, res, next) {
  try {
    const report = await reportService.getClassroomReport(req.params.classroomId)
    res.json(report)
  } catch (err) { next(err) }
}

module.exports = { getSchoolReport, getClassroomReport }
