const { PrismaClient } = require('@prisma/client')
const { AppError } = require('../../../../shared/middlewares/error.middleware')

const prisma = new PrismaClient()

async function listActivities(user) {
  if (user.role === 'TEACHER') {
    const teacher = await prisma.teacherProfile.findUnique({ where: { userId: user.id } })
    if (!teacher) throw new AppError('Professor não encontrado', 404)
    return prisma.activity.findMany({
      where: { classroom: { teachers: { some: { teacherId: teacher.id } } } },
      include: { classroom: { select: { id: true, name: true } }, _count: { select: { questions: true, submissions: true } } }
    })
  }

  if (user.role === 'STUDENT') {
    const student = await prisma.studentProfile.findUnique({ where: { userId: user.id } })
    if (!student) throw new AppError('Aluno não encontrado', 404)
    return prisma.activity.findMany({
      where: { status: 'PUBLISHED', classroom: { students: { some: { studentId: student.id } } } },
      include: {
        classroom: { select: { id: true, name: true } },
        submissions: { where: { studentId: student.id }, select: { status: true, score: true, coinsEarned: true } }
      }
    })
  }

  if (user.role === 'ADMIN') {
    return prisma.activity.findMany({
      where: { classroom: { schoolId: user.schoolId } },
      include: { classroom: { select: { id: true, name: true } }, _count: { select: { questions: true, submissions: true } } }
    })
  }
}

async function getActivity(id) {
  const activity = await prisma.activity.findUnique({
    where: { id },
    include: { questions: { orderBy: { order: 'asc' } }, classroom: { select: { id: true, name: true } } }
  })
  if (!activity) throw new AppError('Atividade não encontrada', 404)
  return activity
}

async function createActivity({ title, description, classroomId, coinReward, xpReward, dueDate, questions }) {
  return prisma.activity.create({
    data: {
      title, description, classroomId,
      coinReward: coinReward || 10,
      xpReward: xpReward || 50,
      dueDate: dueDate ? new Date(dueDate) : null,
      status: 'DRAFT',
      questions: {
        create: questions?.map((q, i) => ({
          order: i + 1,
          text: q.text,
          options: JSON.stringify(q.options),
          answer: q.answer,
          explanation: q.explanation || null
        })) || []
      }
    },
    include: { questions: true }
  })
}

async function publishActivity(id) {
  const activity = await prisma.activity.findUnique({ where: { id } })
  if (!activity) throw new AppError('Atividade não encontrada', 404)
  return prisma.activity.update({ where: { id }, data: { status: 'PUBLISHED' } })
}

async function submitActivity(activityId, studentUserId, answers) {
  const student = await prisma.studentProfile.findUnique({ where: { userId: studentUserId } })
  if (!student) throw new AppError('Aluno não encontrado', 404)

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: { questions: true }
  })
  if (!activity) throw new AppError('Atividade não encontrada', 404)

  const existing = await prisma.submission.findUnique({
    where: { studentId_activityId: { studentId: student.id, activityId } }
  })
  if (existing) throw new AppError('Atividade já respondida', 409)

  // Corrige as respostas
  let correct = 0
  const answersData = answers.map(a => {
    const question = activity.questions.find(q => q.id === a.questionId)
    const isCorrect = question?.answer === a.selected
    if (isCorrect) correct++
    return { questionId: a.questionId, selected: a.selected, isCorrect }
  })

  const score = Math.round((correct / activity.questions.length) * 100)
  const coinsEarned = score >= 60 ? activity.coinReward : 0
  const xpEarned = score >= 60 ? activity.xpReward : 0

  // Cria submissão e atualiza moedas do aluno
  const submission = await prisma.submission.create({
    data: {
      studentId: student.id,
      activityId,
      status: 'GRADED',
      score,
      coinsEarned,
      xpEarned,
      submittedAt: new Date(),
      gradedAt: new Date(),
      answers: { create: answersData }
    },
    include: { answers: true }
  })

  if (coinsEarned > 0) {
    await prisma.studentProfile.update({
      where: { id: student.id },
      data: {
        totalCoins: { increment: coinsEarned },
        totalXp: { increment: xpEarned }
      }
    })

    await prisma.coinTransaction.create({
      data: {
        studentId: student.id,
        amount: coinsEarned,
        description: `Atividade concluída: ${activity.title}`
      }
    })
  }

  return { submission, score, coinsEarned, xpEarned, correct, total: activity.questions.length }
}

async function getStudentProgress(classroomId, studentUserId) {
  const student = await prisma.studentProfile.findUnique({ where: { userId: studentUserId } })
  if (!student) throw new AppError('Aluno não encontrado', 404)

  const submissions = await prisma.submission.findMany({
    where: { studentId: student.id, activity: { classroomId } },
    include: { activity: { select: { title: true, coinReward: true, xpReward: true } } }
  })

  const total = submissions.length
  const completed = submissions.filter(s => s.status === 'GRADED').length
  const avgScore = completed > 0 ? Math.round(submissions.reduce((acc, s) => acc + (s.score || 0), 0) / completed) : 0

  return { student: { id: student.id, totalCoins: student.totalCoins, totalXp: student.totalXp }, total, completed, avgScore, submissions }
}

module.exports = { listActivities, getActivity, createActivity, publishActivity, submitActivity, getStudentProgress }