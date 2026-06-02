// packages/report-service/src/__tests__/report.service.test.js

// Mock do PrismaClient antes de importar o service
jest.mock('@prisma/client', () => {
  const mPrisma = {
    user: {
      count: jest.fn(),
    },
    classroom: {
      count: jest.fn(),
      findUnique: jest.fn(),
    },
    activity: {
      count: jest.fn(),
    },
    submission: {
      count: jest.fn(),
    },
    studentProfile: {
      findMany: jest.fn(),
    },
  }
  return { PrismaClient: jest.fn(() => mPrisma) }
})

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const reportService = require('../services/report.service')
describe('Report Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getSchoolReport', () => {
    it('deve retornar o resumo correto da escola', async () => {
      prisma.user.count
        .mockResolvedValueOnce(5)   // teachers
        .mockResolvedValueOnce(30)  // students
      prisma.classroom.count.mockResolvedValue(3)
      prisma.activity.count.mockResolvedValue(10)
      prisma.submission.count.mockResolvedValue(50)
      prisma.studentProfile.findMany.mockResolvedValue([
        { totalCoins: 100, totalXp: 200, user: { id: '1', name: 'Aluno 1', email: 'a@a.com' } },
        { totalCoins: 80,  totalXp: 150, user: { id: '2', name: 'Aluno 2', email: 'b@b.com' } },
      ])

      const result = await reportService.getSchoolReport('school-id-123')

      expect(result.summary.teachers).toBe(5)
      expect(result.summary.students).toBe(30)
      expect(result.summary.classrooms).toBe(3)
      expect(result.summary.activities).toBe(10)
      expect(result.summary.submissions).toBe(50)
      expect(result.summary.totalCoins).toBe(180)
      expect(result.topStudents).toHaveLength(2)
    })
  })

  describe('getClassroomReport', () => {
    it('deve lançar erro 404 se a sala não existir', async () => {
      prisma.classroom.findUnique.mockResolvedValue(null)

      await expect(
        reportService.getClassroomReport('id-inexistente')
     ).rejects.toMatchObject({ status: 404 })
    })

    it('deve calcular corretamente o relatório de alunos', async () => {
      prisma.classroom.findUnique.mockResolvedValue({
        id: 'sala-1',
        name: 'Turma A',
        code: 'ABC123',
        students: [
          {
            student: {
              user: { id: 'u1', name: 'João', email: 'joao@teste.com' },
              totalXp: 300,
              submissions: [
                { score: 80, coinsEarned: 10, xpEarned: 50, status: 'GRADED' },
                { score: 90, coinsEarned: 15, xpEarned: 50, status: 'GRADED' },
              ],
            },
          },
        ],
        activities: [
          { id: 'a1', title: 'Atividade 1', status: 'PUBLISHED', _count: { submissions: 1 } },
        ],
      })

      const result = await reportService.getClassroomReport('sala-1')

      expect(result.classroom.name).toBe('Turma A')
      expect(result.students[0].completed).toBe(2)
      expect(result.students[0].avgScore).toBe(85)
      expect(result.students[0].totalCoins).toBe(25)
    })
  })
})