# 🪙 KidCoin — Educação Financeira Gamificada

> Solução de software end-to-end para gamificar a educação financeira infantil através do gerenciamento de tarefas escolares e recompensas digitais.

---

##  Visão Geral

Este projeto tem como objetivo desenvolver uma solução completa de software, abrangendo todo o ciclo de vida de desenvolvimento: desde o levantamento de requisitos até a implementação, testes e disponibilização da aplicação.

O **KidCoin** transforma a rotina escolar em uma jornada lúdica, onde o esforço do aluno é recompensado com moedas digitais, ensinando conceitos de valor, poupança e mérito desde cedo.

---

##  Problema de Negócio

A falta de educação financeira básica entre crianças e a dificuldade de engajamento em tarefas extracurriculares são desafios crescentes para pais e educadores.

- **Qual é o contexto?** Ambientes educacionais que buscam novas formas de incentivar o cumprimento de metas.
- **Quem é impactado?** Alunos do ensino fundamental, professores e gestores escolares.
- **Qual processo precisa ser atendido?** A necessidade de uma ferramenta que centralize a distribuição de tarefas e forneça um feedback visual e financeiro (gamificado) imediato para o aluno.

---

##  Solução Proposta

Plataforma gamificada com interface inspirada na estética **Rubber Hose** dos anos 1930.

- **Tipo de sistema:** Web App (SPA + API REST).
- **Principais funcionalidades:** Autenticação com JWT, dashboards por perfil, gestão de salas e atividades, sistema de moedas, loja de itens e mapa de trilhas de aprendizado.
- **Tecnologias e arquitetura adotadas:** Arquitetura MVC com microsserviços, utilizando Node.js, Express, Prisma e PostgreSQL.
- **Diferenciais da solução:** Segurança robusta com JWT, microsserviços independentes e uma identidade visual única que foge do padrão comum de softwares educativos.

---

##  Arquitetura da Solução

O fluxo de dados do KidCoin segue o modelo cliente-servidor com microsserviços:

```
Usuário → React (Vite) → Axios + JWT → API Gateway (Express :3000)
                                              ├── auth-service
                                              ├── user-service
                                              ├── classroom-service
                                              ├── activity-service
                                              ├── coin-service
                                              └── shop-service
                                        Report Service (Express :3006)
                                              └── Prisma → PostgreSQL (Neon)
```

Documentação da API disponível em:
- `http://localhost:3000/api-docs` (Swagger UI)

---

##  Estrutura do Monorepo

```
KidCoin-Project/
├── frontend/                   # React 18 + Vite — SPA com 3 dashboards
│   └── src/
│       ├── pages/
│       │   ├── admin/          # Dashboard, Teachers, Reports
│       │   ├── teacher/        # Dashboard, Classrooms, Activities, Students
│       │   └── student/        # Dashboard, Activities, Shop, Progress
│       ├── contexts/           # AuthContext (JWT + localStorage)
│       └── routes/             # PrivateRoute por role
├── server/                     # API Gateway — CORS, auth middleware, proxy
├── packages/
│   ├── auth-service/           # Login + JWT
│   ├── user-service/           # Usuários e perfis
│   ├── classroom-service/      # Salas e turmas
│   ├── activity-service/       # Atividades e submissões
│   ├── coin-service/           # Moedas + loja
│   └── report-service/         # Relatórios (serviço separado :3006)
└── shared/
    ├── prisma/                 # schema.prisma + migrations + seed
    └── middlewares/            # auth.middleware + error.middleware
```

---

##  Usuários e Perfis

| Role    | Acesso |
|---------|--------|
| ADMIN   | Dashboard geral, gestão de professores e relatórios da escola |
| TEACHER | Salas, atividades, progresso de alunos |
| STUDENT | Atividades, moedas, loja de itens, progresso |

---

## 🎯 Casos de Uso

| ID | Ator | Descrição |
|----|------|-----------|
| UC01 | Todos | **Autenticação:** O usuário realiza login e recebe um token JWT para acessar rotas protegidas. |
| UC02 | ADMIN | **Gerenciar Professores:** Criar, listar, atualizar e desativar professores da escola. |
| UC03 | ADMIN/TEACHER | **Gerenciar Salas:** Criar salas, adicionar e remover alunos. |
| UC04 | TEACHER | **Gerenciar Atividades:** Criar atividades com questões e publicá-las para os alunos. |
| UC05 | STUDENT | **Responder Atividade:** O aluno responde uma atividade e recebe moedas e XP ao acertar 60%+. |
| UC06 | STUDENT | **Loja de Itens:** O aluno usa moedas para comprar itens de personalização do avatar. |
| UC07 | STUDENT | **Visualizar Progresso:** O aluno acessa seu dashboard para ver saldo de moedas, XP e histórico. |
| UC08 | ADMIN/TEACHER | **Relatórios:** Visualizar desempenho geral da escola ou de uma sala específica. |

---

##  Sprints

| Nº Sprint | Objetivo | Data Início | Data Término |
|-----------|----------|-------------|--------------|
| 01 | Levantamento de requisitos e prototipagem | 01/03/2026 | 15/03/2026 |
| 02 | Modelagem de dados e configuração do backend | 16/03/2026 | 30/03/2026 |
| 03 | Implementação de autenticação e middlewares | 01/04/2026 | 05/05/2026 |
| 04 | Desenvolvimento do frontend e integração | 05/05/2026 | 30/05/2026 |
| 05 | Testes finais e entrega do projeto | 01/06/2026 | 05/06/2026 |

---

##  Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React 18, Vite, Axios, React Router v6 |
| **Backend** | Node.js, Express |
| **ORM** | Prisma v5 |
| **Banco de Dados** | PostgreSQL — [Neon](https://neon.tech) |
| **Autenticação** | JWT (jsonwebtoken) + bcryptjs |
| **Documentação** | Swagger UI (swagger-jsdoc + swagger-ui-express) |
| **Infraestrutura** | Render (backend), Vercel (frontend) |
| **Versionamento** | Git / GitHub |
| **Gestão** | Jira (Metodologia Ágil) |

---

##  Funcionalidades

- **🔐 Autenticação segura** com JWT e senha criptografada com bcrypt
- **🛡️ Proteção de rotas** por perfil (ADMIN, TEACHER, STUDENT)
- **🏫 Gestão de salas** com código único de acesso
- **📝 Atividades com questões** de múltipla escolha e correção automática
- **🪙 Sistema de moedas** com histórico de transações
- **🛍️ Loja de itens** para personalização do avatar
- **📊 Relatórios** de desempenho por escola e por sala
- **📚 API documentada** via Swagger UI interativo

---

##  Resultados Esperados

- Gamificação efetiva do aprendizado financeiro.
- Maior engajamento dos alunos nas tarefas escolares.
- Experiência de usuário fluida e visualmente atraente (estética Rubber Hose).
- Código modularizado com microsserviços e preparado para evolução futura.

---

## ▶ Como Executar o Projeto

###  Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- npm v9 ou superior
- Conta gratuita no [Neon](https://neon.tech) para o banco de dados PostgreSQL

###  Instalação

**1. Clonar o repositório**
```bash
git clone https://github.com/seu-usuario/kidcoin.git
cd kidcoin
```

**2. Criar os arquivos `.env`**

Na raiz do projeto (`KidCoin-Project/`):
```env
DATABASE_URL="postgresql://usuario:senha@host/neondb?sslmode=require"
JWT_SECRET="kidcoin_secret_dev"
JWT_EXPIRES_IN="8h"
FRONTEND_URL="http://localhost:5173"
```

Na pasta `shared/` (necessário para o Prisma encontrar o banco):
```env
DATABASE_URL="postgresql://usuario:senha@host/neondb?sslmode=require"
```

> Substitua a `DATABASE_URL` pela connection string do seu projeto no Neon.

**3. Instalar dependências**
```bash
npm install
```

**4. Gerar o Prisma Client**
```bash
npm run db:generate
```

**5. Aplicar as migrations no banco**
```bash
npm run db:migrate
```

**6. Popular o banco com dados de teste**
```bash
npm run db:seed
```

**7. Rodar todos os serviços**
```bash
npm run dev
```

###  URLs locais após iniciar

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API Gateway | http://localhost:3000 |
| Swagger UI | http://localhost:3000/api-docs |
| Report Service | http://localhost:3006 |
| Health Check | http://localhost:3000/health |

---

##  Usuários de Teste (após seed)

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Admin | admin@kidcoin.com | Admin@123 |
| Professor | prof@kidcoin.com | Prof@123 |
| Aluno | aluno@kidcoin.com | Aluno@123 |

---

##  Fluxo de Autenticação

```
React → POST /auth/login → auth-service → bcrypt + JWT → retorna token
React → toda requisição com header: Authorization: Bearer <token>
server → authMiddleware valida JWT → requireRole verifica permissão → microsserviço
```

---

##  Documentação da API

A API é documentada com **Swagger UI**. Com o servidor rodando, acesse:

```
http://localhost:3000/api-docs
```

Para testar rotas protegidas:
1. Faça login em `POST /auth/login` com um dos usuários de teste
2. Copie o `token` da resposta
3. Clique em **Authorize** no Swagger e cole o token

---

## 👩‍💻 Integrantes

- **Camila Queiroz** — [GitHub](https://github.com/camycamyha)
- **Gabriel Pozza** — [GitHub](https://github.com/Gabriel-Pozza)
- **Wesley Fernando** 

---

##  Documentação do Projeto

-  **Confluence (Wiki):** [Acessar](https://gabrielpozza335-1775085903755.atlassian.net/wiki/x/pwDw)
-  **Jira (Board):** [Acessar](https://gabrielpozza335-1775085903755.atlassian.net/jira/software/projects/KID/list/)
-  **Documento de Requisitos (PRD):** *(adicionar link)*


-------------------------------------------------
# 🪙 KidCoin — Educação Financeira para Crianças

SaaS de educação financeira gamificado para crianças de até 10 anos.

## Stack

- **Frontend**: React 18 + Vite + Axios
- **Gateway**: Express (porta 3000)
- **Microserviços**: Express (portas 3001–3005)
- **ORM**: Prisma
- **Banco**: SQL Server
- **Auth**: JWT

## Estrutura do Monorepo

```
kidcoin/
├── frontend/               # React — 3 dashboards (admin, professor, aluno)
├── gateway/                # API Gateway — CORS, auth middleware, proxy
├── packages/
│   ├── auth-service/       # Login + JWT (porta 3001)
│   ├── user-service/       # Usuários e perfis (porta 3002)
│   ├── classroom-service/  # Salas e turmas (porta 3003)
│   ├── activity-service/   # Atividades e submissões (porta 3004)
│   └── coin-service/       # Moedas + loja (porta 3005)
└── shared/
    ├── prisma/             # schema.prisma + migrations (SQLServer)
    ├── middlewares/        # auth.middleware + error.middleware
    └── utils/
```

## Usuários e Perfis

| Role    | Acesso |
|---------|--------|
| ADMIN   | Dashboard geral, professores, relatórios da escola |
| TEACHER | Salas, atividades, progresso de alunos |
| STUDENT | Atividades, moedas, loja de itens, avatar |

## Primeiros Passos

### 1. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Edite o DATABASE_URL com suas credenciais SQL Server
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Gerar o Prisma Client e rodar migrations
```bash
npm run db:generate
npm run db:migrate
```

### 4. Popular o banco com dados de teste
```bash
npm run db:seed
```

### 5. Rodar todos os serviços
```bash
npm run dev
```

## Usuários de Teste (após seed)

| Perfil    | E-mail               | Senha     |
|-----------|----------------------|-----------|
| Admin     | admin@kidcoin.com    | Admin@123 |
| Professor | prof@kidcoin.com     | Prof@123  |
| Aluno     | aluno@kidcoin.com    | Aluno@123 |

## Fluxo de Autenticação

```
React → POST /auth/login → Gateway → auth-service → retorna JWT
React → toda req com header Authorization: Bearer <token>
Gateway → valida JWT → repassa pro microserviço correto
```
