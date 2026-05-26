const { PrismaClient } = require('@prisma/client')
const { AppError } = require('../../../../shared/middlewares/error.middleware')

const prisma = new PrismaClient()

async function getBalance(userId) {
  const student = await prisma.studentProfile.findUnique({
    where: { userId },
    select: { id: true, totalCoins: true, totalXp: true, avatarUrl: true }
  })
  if (!student) throw new AppError('Perfil de aluno não encontrado', 404)
  return student
}

async function getHistory(userId) {
  const student = await prisma.studentProfile.findUnique({ where: { userId } })
  if (!student) throw new AppError('Perfil de aluno não encontrado', 404)

  return prisma.coinTransaction.findMany({
    where: { studentId: student.id },
    orderBy: { createdAt: 'desc' }
  })
}

module.exports = { getBalance, getHistory }