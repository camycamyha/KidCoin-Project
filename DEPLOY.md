# 🚀 Deploy KidCoin — Render + Neon + Vercel

## Stack de produção
- **Frontend** → Vercel (gratuito)
- **Backend** → Render (gratuito)
- **Banco** → Neon PostgreSQL (gratuito)

---

## 1. Banco de dados — Neon (PostgreSQL)

1. Acesse [neon.tech](https://neon.tech) e crie uma conta
2. Crie um novo projeto chamado `kidcoin`
3. Copie a **Connection String** (formato: `postgresql://user:senha@ep-xxx.neon.tech/kidcoin?sslmode=require`)
4. Guarde essa URL — vai usar nos próximos passos

---

## 2. Subir o código no GitHub

```bash
# Na raiz do projeto
git init
git add .
git commit -m "feat: KidCoin SaaS inicial"

# Crie um repositório no GitHub e conecte
git remote add origin https://github.com/SEU_USUARIO/kidcoin.git
git push -u origin main
```

---

## 3. Backend — Render

### Servidor principal (monolito)

1. Acesse [render.com](https://render.com) e faça login com GitHub
2. Clique em **New → Web Service**
3. Conecte o repositório `kidcoin`
4. Configure:
   - **Name:** `kidcoin-server`
   - **Root Directory:** `server`
   - **Build Command:** `cd .. && npm install && npx prisma generate --schema=shared/prisma/schema.prisma && npx prisma migrate deploy --schema=shared/prisma/schema.prisma && npm install --prefix server`
   - **Start Command:** `node index.js`
   - **Plan:** Free

5. Em **Environment Variables**, adicione:
   ```
   DATABASE_URL = sua_url_do_neon
   JWT_SECRET   = uma_senha_forte_qualquer
   JWT_EXPIRES_IN = 8h
   NODE_ENV     = production
   FRONTEND_URL = https://kidcoin.vercel.app  (preencher depois)
   ```

6. Clique em **Create Web Service**
7. Aguarde o deploy (~3 min)
8. Copie a URL gerada: `https://kidcoin-server.onrender.com`

### Report Service (microserviço)

1. Clique em **New → Web Service** novamente
2. Configure:
   - **Name:** `kidcoin-report`
   - **Root Directory:** `packages/report-service`
   - **Build Command:** `cd ../.. && npm install && npx prisma generate --schema=shared/prisma/schema.prisma && npm install --prefix packages/report-service`
   - **Start Command:** `node src/index.js`
   - **Plan:** Free

3. Mesmas variáveis de ambiente do servidor principal

---

## 4. Seed do banco (popular dados iniciais)

Após o deploy do servidor, acesse o **Shell** do Render ou rode localmente apontando para o Neon:

```bash
cd shared
DATABASE_URL="sua_url_neon" node prisma/seed.js
```

---

## 5. Frontend — Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **New Project**
3. Importe o repositório `kidcoin`
4. Configure:
   - **Root Directory:** `frontend`
   - **Framework:** Vite

5. Em **Environment Variables**, adicione:
   ```
   VITE_API_URL    = https://kidcoin-server.onrender.com
   VITE_REPORT_URL = https://kidcoin-report.onrender.com
   ```

6. Clique em **Deploy**
7. Copie a URL: `https://kidcoin.vercel.app`

---

## 6. Atualizar CORS no Render

Volte no Render → `kidcoin-server` → Environment Variables e atualize:
```
FRONTEND_URL = https://kidcoin.vercel.app
```

Faça o mesmo no `kidcoin-report`.

---

## ✅ Checklist final

- [ ] Neon criado e URL copiada
- [ ] Código no GitHub
- [ ] kidcoin-server no Render rodando
- [ ] kidcoin-report no Render rodando
- [ ] Seed executado
- [ ] Frontend no Vercel rodando
- [ ] CORS atualizado com URL do Vercel
- [ ] Testado login com os 3 perfis

---

## Usuários de teste

| Perfil | E-mail | Senha |
|---|---|---|
| Admin | admin@kidcoin.com | Admin@123 |
| Professor | prof@kidcoin.com | Prof@123 |
| Aluno | aluno@kidcoin.com | Aluno@123 |

---

## ⚠️ Atenção — Render gratuito

O plano gratuito do Render **dorme após 15 minutos** sem uso. Na primeira requisição demora ~30 segundos para acordar.

**Solução para apresentação:** Acesse `https://kidcoin-server.onrender.com/health` alguns minutos antes de apresentar para garantir que está acordado.
