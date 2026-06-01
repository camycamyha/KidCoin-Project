// packages/report-service/src/services/report.service.js
const { PrismaClient } = require('@prisma/client')
const { AppError } = require('../../../../shared/middlewares/error.middleware')

const prisma = new PrismaClient()

async function getSchoolReport(schoolId) {
  const [teachers, students, classrooms, activities] = await Promise.all([
    prisma.user.count({ where: { role: 'TEACHER', schoolId, active: true } }),
    prisma.user.count({ where: { role: 'STUDENT', schoolId, active: true } }),
    prisma.classroom.count({ where: { schoolId, active: true } }),
    prisma.activity.count({ where: { classroom: { schoolId } } }),
  ])

  const submissions = await prisma.submission.count({
    where: { activity: { classroom: { schoolId } } }
  })

  const topStudents = await prisma.studentProfile.findMany({
    where: { user: { schoolId } },
    orderBy: { totalCoins: 'desc' },
    take: 10,
    include: { user: { select: { id: true, name: true, email: true } } }
  })

  const totalCoins = topStudents.reduce((a, s) => a + s.totalCoins, 0)
  const totalXp = topStudents.reduce((a, s) => a + s.totalXp, 0)

  return {
    summary: { teachers, students, classrooms, activities, submissions, totalCoins, totalXp },
    topStudents,
  }
}

async function getClassroomReport(classroomId) {
  const classroom = await prisma.classroom.findUnique({
    where: { id: classroomId },
    include: {
      students: {
        include: {
          student: {
            include: {
              user: { select: { id: true, name: true, email: true } },
              submissions: {
                where: { activity: { classroomId } },
                select: { score: true, coinsEarned: true, xpEarned: true, status: true }
              }
            }
          }
        }
      },
      activities: { select: { id: true, title: true, status: true, _count: { select: { submissions: true } } } }
    }
  })

  if (!classroom) throw new AppError('Sala não encontrada', 404)

  const studentsReport = classroom.students.map(cs => {
    const subs = cs.student.submissions
    const completed = subs.filter(s => s.status === 'GRADED').length
    const avgScore = completed > 0 ? Math.round(subs.reduce((a, s) => a + (s.score || 0), 0) / completed) : 0
    const totalCoins = subs.reduce((a, s) => a + s.coinsEarned, 0)
    return {
      student: cs.student.user,
      completed, avgScore, totalCoins,
      totalXp: cs.student.totalXp,
    }
  })

  return {
    classroom: { id: classroom.id, name: classroom.name, code: classroom.code },
    activities: classroom.activities,
    students: studentsReport.sort((a, b) => b.totalCoins - a.totalCoins),
  }
}

module.exports = { getSchoolReport, getClassroomReport }
