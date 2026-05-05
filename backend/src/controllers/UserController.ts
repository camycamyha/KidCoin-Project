import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Chave secreta (Em um projeto real, isso ficaria no arquivo .env)
const CHAVE_MESTRA_PROFESSOR = "KIDCOIN-PROF-2026";

export const cadastrarUsuario = async (req: Request, res: Response) => {
  // 1. Recebendo os dados
  const { nome, email, senha, tipo, chaveAcesso } = req.body;

  try {
    // 2. Validação de Campos Obrigatórios (Evita erro de campo vazio no Banco)
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Por favor, preencha todos os campos obrigatórios." });
    }

    // 3. Validação de Regra de Negócio: Tipo de Usuário
    if (!tipo || (tipo !== "Aluno" && tipo !== "Professor")) {
      return res.status(400).json({ 
        error: "Escolha obrigatória: Você precisa selecionar se é Aluno ou Professor. 😊" 
      });
    }
    //TRAVA DE SEGURANÇA: Validação de Professor
    if (tipo === "Professor") {
      if (!chaveAcesso) {
        return res.status(400).json({ error: "Para se cadastrar como Professor, você deve fornecer a chave de acesso da escola." });
      }
      
      if (chaveAcesso !== CHAVE_MESTRA_PROFESSOR) {
        return res.status(403).json({ error: "Chave de acesso de professor inválida. Verifique com a coordenação." });
      }
    }
    // 4. Validação de Formato de E-mail (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "O formato do e-mail digitado é inválido." });
    }

    // 5. Validação de Segurança: Tamanho da Senha
    if (senha.length < 6) {
      return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres." });
    }

    // 6. Verificação de segurança: E-mail duplicado
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado no KidCoin." });
    }

    // 7. Criptografando a senha (Segurança nível bancário)
    const hashedSenha = await bcrypt.hash(senha, 10);

    // 8. Criando o usuário no MongoDB via Prisma
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email, 
        senha: hashedSenha,
        tipo, 
        saldo: 0 // Todo usuário começa com saldo zerado
      }
    });

    // 9. Resposta de sucesso (Retornando apenas o necessário, sem a senha)
    return res.status(201).json({ 
      message: `${tipo} cadastrado com sucesso! 🎉`, 
      user: { 
        id: novoUsuario.id, 
        nome: novoUsuario.nome, 
        email: novoUsuario.email,
        tipo: novoUsuario.tipo
      } 
    });

  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ 
      error: "Ops! Tivemos um erro interno ao tentar realizar seu cadastro." 
    });
  }
};

//Bloco do Aluno concluindo uma tarefa
export const concluirTarefa = async (req: Request, res: Response) => {
  try {
    const { usuarioId, tarefaId } = req.body;

    // 1. Busca a tarefa para saber quanto ela vale
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: tarefaId }
    });

    if (!tarefa || tarefa.concluida) {
      return res.status(400).json({ error: "Tarefa inválida ou já concluída." });
    }

    // 2. Transação: Atualiza a tarefa e dá as moedas ao aluno
    // Usamos o $transaction para garantir que ou acontece os dois, ou nenhum
    const [tarefaAtualizada, usuarioAtualizado] = await prisma.$transaction([
      prisma.tarefa.update({
        where: { id: tarefaId },
        data: { concluida: true }
      }),
      prisma.usuario.update({
        where: { id: usuarioId },
        data: {
          saldo: { increment: tarefa.recompensa }
        }
      })
    ]);

    return res.status(200).json({
      message: "Missão cumprida!",
      recompensa: tarefa.recompensa,
      novoSaldo: usuarioAtualizado.saldo
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao processar conclusão da tarefa." });
  }
};