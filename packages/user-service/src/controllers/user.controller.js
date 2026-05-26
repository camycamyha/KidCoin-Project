const userService = require('../services/user.service')

async function listTeachers(req, res, next) {
  try {
    const teachers = await userService.listTeachers(req.user.schoolId)
    res.json(teachers)
  } catch (err) { next(err) }
}

async function listStudents(req, res, next) {
  try {
    const students = await userService.listStudents(req.user.schoolId)
    res.json(students)
  } catch (err) { next(err) }
}

async function getUser(req, res, next) {
  try {
    const user = await userService.getUser(req.params.id)
    res.json(user)
  } catch (err) { next(err) }
}

async function createTeacher(req, res, next) {
  try {
    const teacher = await userService.createTeacher({ ...req.body, schoolId: req.user.schoolId })
    res.status(201).json(teacher)
  } catch (err) { next(err) }
}

async function createStudent(req, res, next) {
  try {
    const student = await userService.createStudent({ ...req.body, schoolId: req.user.schoolId })
    res.status(201).json(student)
  } catch (err) { next(err) }
}

async function updateUser(req, res, next) {
  try {
    const user = await userService.updateUser(req.params.id, req.body)
    res.json(user)
  } catch (err) { next(err) }
}

async function deactivateUser(req, res, next) {
  try {
    const user = await userService.deactivateUser(req.params.id)
    res.json(user)
  } catch (err) { next(err) }
}

module.exports = { listTeachers, listStudents, getUser, createTeacher, createStudent, updateUser, deactivateUser }