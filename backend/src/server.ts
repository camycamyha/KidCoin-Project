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
          tags: ['Usuários'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string', example: 'Pedro Silva' },   
                    email: { type: 'string', example: 'pedro@email.com' },
                    senha: { type: 'string' },  
                    tipo: { 
                      type: 'string',
                      enum: ['Aluno', 'Professor']
                    },
                  },
                  required: ['nome', 'email', 'senha', 'tipo']
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
                    email: { type: 'string' },
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
    summary: 'Consulta a trilha de módulos liberados para o estudante',
    tags: ['Aprendizado'],
    responses: { 
      200: { description: 'Dados do mapa carregados com sucesso!' } 
    }
  }
},
// ROTA DE LISTAR ALUNOS DE UMA SALA ESPECÍFICA
      '/api/salas/{salaId}/alunos': {
        get: {
          summary: 'Lista todos os alunos matriculados em uma sala específica',
          tags: ['Salas'],
          parameters: [
            {
              name: 'salaId',
              in: 'path',
              required: true,
              description: 'ID da sala que você quer consultar',
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: { description: 'Lista de alunos retornada com sucesso' },
            500: { description: 'Erro interno no servidor' }
          }
        }
      },
      '/api/salas/mapa/{usuarioId}': {
        get: {
          summary: 'Retorna os módulos liberados para o mapa do aluno',
          tags: ['Salas'],
          parameters: [
            {
              name: 'usuarioId',
              in: 'path',
              required: true,
              description: 'ID do aluno para carregar o mapa dele',
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: { description: 'Lista de módulos da trilha retornada com sucesso' },
            404: { description: 'Aluno não encontrado ou sem sala' }
          }
        }
      },
      '/api/salas/nome/{nome}': {
        delete: {
          summary: 'Deleta uma sala usando o nome',
          tags: ['Salas'],
          parameters: [
            {
              name: 'nome',
              in: 'path',
              required: true,
              description: 'Nome exato da sala que deseja excluir',
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: { description: 'Sala excluída com sucesso' },
            500: { description: 'Erro interno do servidor' }
          }
        }
      },
    }, // Fim do paths
  }, // Fim do definition
  apis: [], 
};

const specs = swaggerJsdoc(swaggerOptions);

// Rotas do Aplicativo
app.use('/auth', authRoutes);
app.use('/api/usuarios', UserRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/salas', salaRoutes);
app.use('/api/modulos', moduloRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação (Swagger) em http://localhost:${PORT}/api-docs`);
});