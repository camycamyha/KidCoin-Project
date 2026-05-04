import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import UserRoutes from './routes/UserRoutes';
import authRoutes from './routes/authRoutes';

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
          summary: 'Cadastra um novo usuário(Aluno ou Professor)',
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
                    tipo: { type: 'string', example: 'ALUNO' },
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Aluno criado com sucesso' },
          },
        },
      },
      // ROTA DE LOGIN (Adicionada aqui)
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
    },
  },
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