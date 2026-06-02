// server/swagger.js
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KidCoin API',
      version: '1.0.0',
      description: 'API do sistema de educação financeira gamificada KidCoin. Utilize o botão Authorize para inserir o token JWT obtido no endpoint /auth/login.',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Desenvolvimento local' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Mensagem de erro' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@kidcoin.com' },
            password: { type: 'string', example: 'Admin@123' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string', example: 'Administrador' },
                email: { type: 'string', example: 'admin@kidcoin.com' },
                role: { type: 'string', enum: ['ADMIN', 'TEACHER', 'STUDENT'] },
                school: { type: 'string', example: 'Escola Municipal KidCoin' },
              },
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['ADMIN', 'TEACHER', 'STUDENT'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateUserRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Maria Silva' },
            email: { type: 'string', format: 'email', example: 'maria@escola.com' },
            password: { type: 'string', example: 'Senha@123' },
          },
        },
        UpdateUserRequest: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Maria Silva' },
            email: { type: 'string', format: 'email', example: 'maria@escola.com' },
          },
        },
        Classroom: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: '5º Ano A' },
            description: { type: 'string', example: 'Turma de educação financeira' },
            code: { type: 'string', example: 'TURMA-5A' },
            active: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateClassroomRequest: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: '5º Ano A' },
            description: { type: 'string', example: 'Turma de educação financeira' },
          },
        },
        Activity: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string', example: 'O que é poupança?' },
            description: { type: 'string' },
            coinReward: { type: 'integer', example: 10 },
            xpReward: { type: 'integer', example: 50 },
            status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] },
            dueDate: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateActivityRequest: {
          type: 'object',
          required: ['title', 'classroomId'],
          properties: {
            title: { type: 'string', example: 'O que é poupança?' },
            description: { type: 'string', example: 'Aprenda sobre poupança e investimentos' },
            classroomId: { type: 'string', format: 'uuid' },
            coinReward: { type: 'integer', example: 10 },
            xpReward: { type: 'integer', example: 50 },
            dueDate: { type: 'string', format: 'date-time', nullable: true },
            questions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  text: { type: 'string', example: 'O que é poupança?' },
                  options: { type: 'array', items: { type: 'string' }, example: ['Gastar tudo', 'Guardar dinheiro', 'Pedir emprestado', 'Nenhuma'] },
                  answer: { type: 'string', example: 'Guardar dinheiro' },
                  explanation: { type: 'string', example: 'Poupança é guardar dinheiro para o futuro' },
                },
              },
            },
          },
        },
        SubmitActivityRequest: {
          type: 'object',
          required: ['answers'],
          properties: {
            answers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  questionId: { type: 'string', format: 'uuid' },
                  selected: { type: 'string', example: 'Guardar dinheiro' },
                },
              },
            },
          },
        },
        ShopItem: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Chapéu de Cowboy' },
            description: { type: 'string' },
            imageUrl: { type: 'string', nullable: true },
            price: { type: 'integer', example: 30 },
            category: { type: 'string', enum: ['hat', 'shirt', 'pants', 'shoes', 'accessory'] },
            active: { type: 'boolean' },
          },
        },
        CreateShopItemRequest: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            name: { type: 'string', example: 'Chapéu de Cowboy' },
            description: { type: 'string', example: 'Um chapéu estiloso' },
            imageUrl: { type: 'string', example: '/items/hat-cowboy.png' },
            price: { type: 'integer', example: 30 },
            category: { type: 'string', enum: ['hat', 'shirt', 'pants', 'shoes', 'accessory'] },
          },
        },
        CoinBalance: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            totalCoins: { type: 'integer', example: 50 },
            totalXp: { type: 'integer', example: 100 },
            avatarUrl: { type: 'string', nullable: true },
          },
        },
        CoinTransaction: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            amount: { type: 'integer', example: 10, description: 'Positivo = ganhou, negativo = gastou' },
            description: { type: 'string', example: 'Atividade concluída: O que é poupança?' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    paths: {
      // ─── AUTH ───────────────────────────────────────────────────────
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login',
          description: 'Autentica um usuário e retorna o token JWT',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
          },
          responses: {
            200: { description: 'Login realizado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
            400: { description: 'E-mail e senha são obrigatórios' },
            401: { description: 'E-mail ou senha inválidos' },
          },
        },
      },
      '/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Dados do usuário autenticado',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Dados do usuário logado' },
            401: { description: 'Token não fornecido ou inválido' },
          },
        },
      },

      // ─── USERS ──────────────────────────────────────────────────────
      '/users/teachers': {
        get: {
          tags: ['Usuários'],
          summary: 'Listar professores',
          description: 'Retorna todos os professores da escola. Apenas ADMIN.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Lista de professores', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/User' } } } } },
            403: { description: 'Acesso negado' },
          },
        },
        post: {
          tags: ['Usuários'],
          summary: 'Criar professor',
          description: 'Cria um novo professor na escola. Apenas ADMIN.',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateUserRequest' } } } },
          responses: {
            201: { description: 'Professor criado com sucesso' },
            409: { description: 'E-mail já cadastrado' },
          },
        },
      },
      '/users/students': {
        get: {
          tags: ['Usuários'],
          summary: 'Listar alunos',
          description: 'Retorna todos os alunos da escola. ADMIN e TEACHER.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Lista de alunos', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/User' } } } } },
            403: { description: 'Acesso negado' },
          },
        },
        post: {
          tags: ['Usuários'],
          summary: 'Criar aluno',
          description: 'Cria um novo aluno na escola. Apenas ADMIN.',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateUserRequest' } } } },
          responses: {
            201: { description: 'Aluno criado com sucesso' },
            409: { description: 'E-mail já cadastrado' },
          },
        },
      },
      '/users/{id}': {
        get: {
          tags: ['Usuários'],
          summary: 'Buscar usuário por ID',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            200: { description: 'Dados do usuário', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
            404: { description: 'Usuário não encontrado' },
          },
        },
        put: {
          tags: ['Usuários'],
          summary: 'Atualizar usuário',
          description: 'Atualiza nome e e-mail de um usuário. Apenas ADMIN.',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateUserRequest' } } } },
          responses: {
            200: { description: 'Usuário atualizado' },
            404: { description: 'Usuário não encontrado' },
          },
        },
        delete: {
          tags: ['Usuários'],
          summary: 'Desativar usuário',
          description: 'Desativa um usuário (soft delete). Apenas ADMIN.',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            200: { description: 'Usuário desativado' },
            404: { description: 'Usuário não encontrado' },
          },
        },
      },

      // ─── CLASSROOMS ─────────────────────────────────────────────────
      '/classrooms': {
        get: {
          tags: ['Salas'],
          summary: 'Listar salas',
          description: 'Retorna as salas do usuário autenticado, filtrado por role.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Lista de salas', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Classroom' } } } } },
          },
        },
        post: {
          tags: ['Salas'],
          summary: 'Criar sala',
          description: 'Cria uma nova sala. ADMIN ou TEACHER.',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateClassroomRequest' } } } },
          responses: {
            201: { description: 'Sala criada com sucesso' },
          },
        },
      },
      '/classrooms/{id}': {
        get: {
          tags: ['Salas'],
          summary: 'Detalhes de uma sala',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            200: { description: 'Detalhes da sala com alunos e professores' },
            404: { description: 'Sala não encontrada' },
          },
        },
      },
      '/classrooms/{id}/students': {
        post: {
          tags: ['Salas'],
          summary: 'Adicionar aluno à sala',
          description: 'ADMIN ou TEACHER.',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: { studentUserId: { type: 'string', format: 'uuid' } } } } },
          },
          responses: {
            200: { description: 'Aluno adicionado com sucesso' },
            409: { description: 'Aluno já está nessa sala' },
          },
        },
      },
      '/classrooms/{id}/students/{studentId}': {
        delete: {
          tags: ['Salas'],
          summary: 'Remover aluno da sala',
          description: 'ADMIN ou TEACHER.',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
            { name: 'studentId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
          ],
          responses: {
            200: { description: 'Aluno removido com sucesso' },
            404: { description: 'Aluno não encontrado' },
          },
        },
      },

      // ─── ACTIVITIES ─────────────────────────────────────────────────
      '/activities': {
        get: {
          tags: ['Atividades'],
          summary: 'Listar atividades',
          description: 'Retorna atividades filtradas por role do usuário.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Lista de atividades', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Activity' } } } } },
          },
        },
        post: {
          tags: ['Atividades'],
          summary: 'Criar atividade',
          description: 'Cria uma atividade com questões. Apenas TEACHER.',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateActivityRequest' } } } },
          responses: {
            201: { description: 'Atividade criada com sucesso' },
          },
        },
      },
      '/activities/{id}': {
        get: {
          tags: ['Atividades'],
          summary: 'Detalhes de uma atividade',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            200: { description: 'Atividade com questões' },
            404: { description: 'Atividade não encontrada' },
          },
        },
      },
      '/activities/{id}/publish': {
        patch: {
          tags: ['Atividades'],
          summary: 'Publicar atividade',
          description: 'Muda o status de DRAFT para PUBLISHED. Apenas TEACHER.',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            200: { description: 'Atividade publicada' },
            404: { description: 'Atividade não encontrada' },
          },
        },
      },
      '/activities/{id}/submit': {
        post: {
          tags: ['Atividades'],
          summary: 'Responder atividade',
          description: 'Aluno responde uma atividade e recebe moedas/XP se acertar 60%+. Apenas STUDENT.',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/SubmitActivityRequest' } } } },
          responses: {
            200: { description: 'Atividade respondida', content: { 'application/json': { schema: { type: 'object', properties: { score: { type: 'integer', example: 80 }, coinsEarned: { type: 'integer', example: 10 }, xpEarned: { type: 'integer', example: 50 }, correct: { type: 'integer' }, total: { type: 'integer' } } } } } },
            409: { description: 'Atividade já respondida' },
          },
        },
      },
      '/activities/progress/{classroomId}/{studentId}': {
        get: {
          tags: ['Atividades'],
          summary: 'Progresso do aluno numa sala',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'classroomId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
            { name: 'studentId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
          ],
          responses: {
            200: { description: 'Progresso com submissões e médias' },
            404: { description: 'Aluno não encontrado' },
          },
        },
      },

      // ─── COINS ──────────────────────────────────────────────────────
      '/coins/balance': {
        get: {
          tags: ['Moedas'],
          summary: 'Saldo de moedas do aluno',
          description: 'Retorna totalCoins e totalXp do aluno autenticado. Apenas STUDENT.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Saldo atual', content: { 'application/json': { schema: { $ref: '#/components/schemas/CoinBalance' } } } },
            404: { description: 'Perfil de aluno não encontrado' },
          },
        },
      },
      '/coins/history': {
        get: {
          tags: ['Moedas'],
          summary: 'Histórico de transações',
          description: 'Retorna todas as movimentações de moedas do aluno. Apenas STUDENT.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Lista de transações', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/CoinTransaction' } } } } },
          },
        },
      },

      // ─── SHOP ───────────────────────────────────────────────────────
      '/shop': {
        get: {
          tags: ['Loja'],
          summary: 'Listar itens da loja',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'category', in: 'query', required: false, schema: { type: 'string', enum: ['hat', 'shirt', 'pants', 'shoes', 'accessory'] } }],
          responses: {
            200: { description: 'Lista de itens disponíveis', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ShopItem' } } } } },
          },
        },
        post: {
          tags: ['Loja'],
          summary: 'Adicionar item na loja',
          description: 'Apenas ADMIN.',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateShopItemRequest' } } } },
          responses: {
            201: { description: 'Item criado com sucesso' },
          },
        },
      },
      '/shop/buy/{itemId}': {
        post: {
          tags: ['Loja'],
          summary: 'Comprar item',
          description: 'Aluno compra um item da loja gastando moedas. Apenas STUDENT.',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'itemId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            200: { description: 'Compra realizada', content: { 'application/json': { schema: { type: 'object', properties: { item: { $ref: '#/components/schemas/ShopItem' }, remainingCoins: { type: 'integer' } } } } } },
            400: { description: 'Moedas insuficientes' },
            409: { description: 'Você já possui esse item' },
          },
        },
      },
      '/shop/my-items': {
        get: {
          tags: ['Loja'],
          summary: 'Meus itens comprados',
          description: 'Retorna os itens comprados pelo aluno. Apenas STUDENT.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Lista de itens comprados' },
          },
        },
      },

      // ─── HEALTH ─────────────────────────────────────────────────────
      '/health': {
        get: {
          tags: ['Sistema'],
          summary: 'Health check',
          description: 'Verifica se o servidor está rodando.',
          responses: {
            200: { description: 'Servidor online', content: { 'application/json': { schema: { type: 'object', properties: { status: { type: 'string', example: 'ok' }, services: { type: 'array', items: { type: 'string' } }, timestamp: { type: 'string', format: 'date-time' } } } } } },
          },
        },
      },
    },
  },
  apis: [],
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec