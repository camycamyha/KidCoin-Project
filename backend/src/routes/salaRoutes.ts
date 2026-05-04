import { Router } from 'express';
import { criarSala, adicionarAlunoNaSala, listarAlunosSemSala } from '../controllers/SalaController';

const router = Router();

router.post('/criar', criarSala);
router.get('/alunos-disponiveis', listarAlunosSemSala); // Para carregar a lista no seu modal/página
router.patch('/adicionar-aluno', adicionarAlunoNaSala); // Para o botão "Adicionar"

export default router;