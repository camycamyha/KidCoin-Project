# Projeto Integrador: KidCoin 🪙

> Solução de Software end-to-end para gamificar a educação financeira infantil através do gerenciamento de tarefas escolares e recompensas digitais.
> 

---

## Visão Geral

Este projeto tem como objetivo desenvolver uma solução completa de software, abrangendo todo o ciclo de vida de desenvolvimento: desde o levantamento de requisitos até a implementação, testes e disponibilização da aplicação.

O **KidCoin** transforma a rotina escolar em uma jornada lúdica, onde o esforço do aluno é recompensado com moedas digitais, ensinando conceitos de valor, poupança e mérito desde cedo.

---

## Problema de Negócio

A falta de educação financeira básica entre crianças e a dificuldade de engajamento em tarefas extracurriculares são desafios crescentes para pais e educadores.

- **Qual é o contexto?** Ambientes educacionais que buscam novas formas de incentivar o cumprimento de metas.
- **Quem é impactado?** Alunos do ensino fundamental, professores e gestores escolares.
- **Qual processo precisa ser atendido?** A necessidade de uma ferramenta que centralize a distribuição de tarefas e forneça um feedback visual e financeiro (gamificado) imediato para o aluno.

---

## Solução Proposta

Plataforma gamificada com interface inspirada na estética **Rubber Hose** dos anos 1930.

- **Tipo de sistema:** Web App (Frontend e API REST).
- **Principais funcionalidades:** Cadastro seguro com chaves de acesso, dashboard de progresso, gestão de salas e mapa de trilhas de aprendizado.
- **Tecnologias e arquitetura adotadas:** Arquitetura em camadas (MVC), utilizando Node.js, TypeScript e MongoDB.
- **Diferenciais da solução:** Segurança robusta com JWT e uma identidade visual única que foge do padrão comum de softwares educativos.

---

## Arquitetura da Solução

O fluxo de dados do KidCoin segue o modelo cliente-servidor:

**Usuário** → **Interface (React/Vite)** → **Middleware de Autenticação (JWT)** → **API (Node.js/Express)** → **ORM (Prisma)** → **Banco de Dados (MongoDB)**

---

## Documentação do Projeto

Para garantir a transparência e o acompanhamento ágil do desenvolvimento, utilizamos as seguintes ferramentas de documentação e gestão:

📄 Documentação Técnica (Confluence): Acesse aqui a Wiki do Projeto https://gabrielpozza335-1775085903755.atlassian.net/wiki/x/pwDw

📊 Gestão de Tarefas (Jira): Acesse aqui o Board do Projeto https://gabrielpozza335-1775085903755.atlassian.net/jira/software/projects/KID/list/?filter=allissues&jql=project+%3D+%22KID%22+ORDER+BY+created+DESC&visitedUserSeg=true&atlOrigin=eyJpIjoiNWU5Y2Q2NmQ3YjExNGU2Y2I1YmE4YjI4N2E0ZmE3NjgiLCJwIjoiaiJ9

📝 Documento de Requisitos (PRD): Acesse o Google Docs de Requisitos


---

## Casos de Uso (Use Cases)

Abaixo estão descritos os principais fluxos de interação com o sistema:

| **ID** | **Ator** | **Descrição** |
| --- | --- | --- |
| **UC01** | Todos | **Realizar Cadastro:** Permite que usuários criem contas. Se o tipo for "Professor", exige-se uma `Chave de Acesso` mestra. |
| **UC02** | Todos | **Autenticação:** O usuário realiza login e recebe um token JWT para acessar rotas protegidas. |
| **UC03** | Aluno | **Visualizar Progresso:** O aluno acessa seu dashboard para ver seu saldo de KidCoins e o percentual de conclusão das tarefas da sua sala. |
| **UC04** | Professor | **Gerenciar Salas:** Permite criar, listar ou excluir salas de aula para organizar os grupos de alunos. |
| **UC05** | Aluno | **Consultar Mapa de Módulos:** O aluno visualiza quais módulos da trilha de aprendizado estão liberados para o seu nível. |

---

## Sprints

| **nº Sprint** | **Objetivo** | **Data Inicio** | **Data Término** |
| --- | --- | --- | --- |
| 01 | Levantamento de Requisitos e Prototipagem | 01/03/2026 | 15/03/2026 |
| 02 | Modelagem de Dados e Configuração do Backend | 16/04/2026 | 30/04/2026 |
| 03 | Implementação de Autenticação e Middlewares | 01/04/2026 | 05/05/2026 |
| 04 | Desenvolvimento do Frontend e Integração | 05/05/2026 | 30/05/2026 |
| 05 | Testes Finais e Entrega do Projeto | 01/05/2026 | 05/05/2026 |

---

## Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Frontend**: React (Vite)
- **Backend**: Node.js com Express
- **Banco de Dados**: MongoDB (Atlas)
- **ORM**: Prisma
- **Documentação**: Swagger UI
- **Versionamento**: Git / GitHub
- **Gestão**: Jira (Metodologia Ágil)

---

## Funcionalidades

- **🎒 Dashboard do Aluno:** Visualização de saldo e acompanhamento de progresso nas tarefas da sala.
- **👩‍🏫 Painel do Professor:** Criação de salas, exclusão de turmas e gerenciamento de atividades.
- **🛡️ Controle de Acesso:** Autenticação via JWT com diferentes níveis de permissão (Aluno/Professor).
- **📝 Documentação Interativa:** API documentada via Swagger para facilitar testes e integração.

---

## Resultados Esperados

- Gamificação efetiva do aprendizado financeiro.
- Redução na inadimplência de entrega de tarefas escolares.
- Experiência de usuário fluida e visualmente atraente.
- Código modularizado e preparado para novas funcionalidades (como uma "Loja de Prêmios").

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js (v18+) instalado.
- Conta no MongoDB Atlas ou MongoDB local rodando.

### Instalação

Bash

`# 1. Clonar o repositório
git clone https://github.com/seu-usuario/kidcoin.git

### 2. Acessar a pasta do projeto
cd kidcoin

### 3. Instalar dependências
npm install

### 4. Configurar variáveis de ambiente
### Crie um arquivo .env na raiz e adicione:
### DATABASE_URL="sua_url_do_mongodb"
### JWT_SECRET="sua_chave_secreta"

### 5. Gerar cliente do Prisma
npx prisma generate

### 6. Rodar aplicação
npm run dev`

---

## 👩‍💻 Integrantes

*   **Camila Queiroz** - [GitHub](https://github.com/camycamyha)
*   **Gabriel Pozza** - [GitHub](https://github.com/Gabriel-Pozza)
---
