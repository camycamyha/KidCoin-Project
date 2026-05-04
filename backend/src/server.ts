import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import UserRoutes from './routes/UserRoutes';
import authRoutes from './routes/authRoutes';
import salaRoutes from './routes/salaRoutes';
import moduloRoutes from './routes/moduloRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', UserRoutes); 
app.use('/api/salas', salaRoutes);
app.use('/auth', authRoutes); // Isso ativa a rota http://localhost:3001/auth/login
app.use('/api/modulos', moduloRoutes);


// Configuração do Swagger Centralizada
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KidCoin API',
      version: '1.0.0',
      description: 'Documentação da API do projeto KidCoin',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
    paths: {
      // ROTA DE CADASTRO 
      '/api/usuarios/cadastrar': {
        post: {
          summary: 'Cadastra um novo usuário (Aluno ou Professor)',
          tags: ['Usuarios'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string' },   
                    login: { type: 'string' },
                    senha: { type: 'string' },  
                    tipo: { 
                      type: 'string',
                      enum: ['ALUNO', 'PROFESSOR'],
                      example: 'ALUNO' 
                    },
                  }
                }
              }
            }
          },
          responses: {
            201: { 
              description: 'Usuário (Aluno ou Professor) cadastrado com sucesso!' 
            },
            400: { 
              description: 'Erro: Seleção de tipo inválida ou e-mail já cadastrado.' 
            }
          },
        },
      },
      // ROTA DE LOGIN
      '/auth/login': {
        post: {
          summary: 'Realiza o login do usuário',
          tags: ['Autenticação'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    login: { type: 'string' },
                    senha: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Login realizado com sucesso' },
            401: { description: 'Credenciais inválidas' }
          },
        },
      },
      // ROTA DE CRIAR SALA
      '/api/salas/criar': {
        post: {
          summary: 'Cria uma nova sala e gera um código de acesso',
          tags: ['Salas'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string', example: 'Turma 3º Ano A' },
                    professorId: { type: 'string', description: 'ID do professor logado' }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Sala criada com sucesso!' } }
        }
      },
      // ROTA DE LISTAR ALUNOS
      '/api/salas/alunos-disponiveis': {
        get: {
          summary: 'Lista alunos que ainda não estão em nenhuma sala',
          tags: ['Salas'],
          responses: { 200: { description: 'Lista de alunos disponível' } }
        }
      },
      // ROTA DE ADICIONAR ALUNO
      '/api/salas/adicionar-aluno': {
        patch: {
          summary: 'Vincula um aluno específico a uma sala',
          tags: ['Salas'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    alunoId: { type: 'string' },
                    salaId: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Vínculo realizado!' } }
        }
      },
      //Api do Módulo e Mapa
      '/api/modulos/mapa': {
  get: {
    summary: 'Retorna a estrutura do mapa/tabuleiro com tarefas',
    tags: ['Mapa'],
    responses: { 
      200: { description: 'Dados do mapa carregados com sucesso!' } 
    }
  }
}
    }, // Fim do paths
  }, // Fim do definition
  apis: [], 
};

const specs = swaggerJsdoc(swaggerOptions);

// Rotas do Aplicativo
app.use('/auth', authRoutes);
app.use('/api/usuarios', UserRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação (Swagger) em http://localhost:${PORT}/api-docs`);
});