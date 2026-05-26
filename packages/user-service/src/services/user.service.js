const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const { AppError } = require('../../../../shared/middlewares/error.middleware')

const prisma = new PrismaClient()

async function listTeachers(schoolId) {
  return prisma.user.findMany({
    where: { role: 'TEACHER', schoolId, active: true },
    select: {
      id: true, name: true, email: true, createdAt: true,
      teacherProfile: {
        select: {
          id: true,
          classrooms: {
            select: { classroom: { select: { id: true, name: true } } }
          }
        }
      }
    }
  })
}

async function listStudents(schoolId) {
  return prisma.user.findMany({
    where: { role: 'STUDENT', schoolId, active: true },
    select: {
      id: true, name: true, email: true, createdAt: true,
      studentProfile: {
        select: { id: true, totalCoins: true, totalXp: true, avatarUrl: true }
      }
    }
  })
}

async function getUser(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true, name: true, email: true, role: true, createdAt: true,
      school: { select: { id: true, name: true } },
      teacherProfile: { select: { id: true } },
      studentProfile: { select: { id: true, totalCoins: true, totalXp: true } }
    }
  })
  if (!user) throw new AppError('Usuário não encontrado', 404)
  return user
}

async function createTeacher({ name, email, password, schoolId }) {
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) throw new AppError('E-mail já cadastrado', 409)

  return prisma.user.create({
    data: {
      name, email,
      password: bcrypt.hashSync(password, 10),
      role: 'TEACHER',
      schoolId,
      teacherProfile: { create: {} }
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  })
}

async function createStudent({ name, email, password, schoolId }) {
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) throw new AppError('E-mail já cadastrado', 409)

  return prisma.user.create({
    data: {
      name, email,
      password: bcrypt.hashSync(password, 10),
      role: 'STUDENT',
      schoolId,
      studentProfile: { create: {} }
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  })
}

async function updateUser(id, { name, email }) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new AppError('Usuário não encontrado', 404)

  return prisma.user.update({
    where: { id },
    data: { name, email },
    select: { id: true, name: true, email: true, role: true }
  })
}

async function deactivateUser(id) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new AppError('Usuário não encontrado', 404)

  return prisma.user.update({
    where: { id },
    data: { active: false },
    select: { id: true, name: true, active: true }
  })
}

module.exports = { listTeachers, listStudents, getUser, createTeacher, createStudent, updateUser, deactivateUser }