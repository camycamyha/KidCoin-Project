const { PrismaClient } = require('@prisma/client')
const { AppError } = require('../../../../shared/middlewares/error.middleware')

const prisma = new PrismaClient()

async function listClassrooms(user) {
  if (user.role === 'ADMIN') {
    return prisma.classroom.findMany({
      where: { schoolId: user.schoolId, active: true },
      include: {
        teachers: { include: { teacher: { include: { user: { select: { name: true } } } } } },
        _count: { select: { students: true, activities: true } }
      }
    })
  }

  if (user.role === 'TEACHER') {
    const teacher = await prisma.teacherProfile.findUnique({ where: { userId: user.id } })
    if (!teacher) throw new AppError('Perfil de professor não encontrado', 404)
    return prisma.classroom.findMany({
      where: { active: true, teachers: { some: { teacherId: teacher.id } } },
      include: { _count: { select: { students: true, activities: true } } }
    })
  }

  if (user.role === 'STUDENT') {
    const student = await prisma.studentProfile.findUnique({ where: { userId: user.id } })
    if (!student) throw new AppError('Perfil de aluno não encontrado', 404)
    return prisma.classroom.findMany({
      where: { active: true, students: { some: { studentId: student.id } } },
      include: { _count: { select: { activities: true } } }
    })
  }
}

async function getClassroom(id) {
  const classroom = await prisma.classroom.findUnique({
    where: { id },
    include: {
      teachers: { include: { teacher: { include: { user: { select: { id: true, name: true, email: true } } } } } },
      students: { include: { student: { include: { user: { select: { id: true, name: true, email: true } } } } } },
      _count: { select: { activities: true } }
    }
  })
  if (!classroom) throw new AppError('Sala não encontrada', 404)
  return classroom
}

async function createClassroom({ name, description, schoolId, teacherId }) {
  const teacher = await prisma.teacherProfile.findUnique({ where: { userId: teacherId } })
  if (!teacher) throw new AppError('Professor não encontrado', 404)

  const code = `TURMA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

  return prisma.classroom.create({
    data: {
      name, description, code, schoolId,
      teachers: { create: { teacherId: teacher.id } }
    }
  })
}

async function addStudent(classroomId, studentUserId) {
  const classroom = await prisma.classroom.findUnique({ where: { id: classroomId } })
  if (!classroom) throw new AppError('Sala não encontrada', 404)

  const student = await prisma.studentProfile.findUnique({ where: { userId: studentUserId } })
  if (!student) throw new AppError('Aluno não encontrado', 404)

  const already = await prisma.classroomStudent.findUnique({
    where: { classroomId_studentId: { classroomId, studentId: student.id } }
  })
  if (already) throw new AppError('Aluno já está nessa sala', 409)

  return prisma.classroomStudent.create({
    data: { classroomId, studentId: student.id }
  })
}

async function removeStudent(classroomId, studentUserId) {
  const student = await prisma.studentProfile.findUnique({ where: { userId: studentUserId } })
  if (!student) throw new AppError('Aluno não encontrado', 404)

  return prisma.classroomStudent.delete({
    where: { classroomId_studentId: { classroomId, studentId: student.id } }
  })
}

module.exports = { listClassrooms, getClassroom, createClassroom, addStudent, removeStudent }