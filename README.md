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
