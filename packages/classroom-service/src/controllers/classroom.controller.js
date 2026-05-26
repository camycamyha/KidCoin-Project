const classroomService = require('../services/classroom.service')

async function listClassrooms(req, res, next) {
  try {
    const classrooms = await classroomService.listClassrooms(req.user)
    res.json(classrooms)
  } catch (err) { next(err) }
}

async function getClassroom(req, res, next) {
  try {
    const classroom = await classroomService.getClassroom(req.params.id)
    res.json(classroom)
  } catch (err) { next(err) }
}

async function createClassroom(req, res, next) {
  try {
    const classroom = await classroomService.createClassroom({
      ...req.body,
      schoolId: req.user.schoolId,
      teacherId: req.user.id
    })
    res.status(201).json(classroom)
  } catch (err) { next(err) }
}

async function addStudent(req, res, next) {
  try {
    await classroomService.addStudent(req.params.id, req.body.studentUserId)
    res.json({ message: 'Aluno adicionado com sucesso' })
  } catch (err) { next(err) }
}

async function removeStudent(req, res, next) {
  try {
    await classroomService.removeStudent(req.params.id, req.params.studentId)
    res.json({ message: 'Aluno removido com sucesso' })
  } catch (err) { next(err) }
}

module.exports = { listClassrooms, getClassroom, createClassroom, addStudent, removeStudent }