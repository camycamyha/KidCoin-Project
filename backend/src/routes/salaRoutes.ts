import { Router } from 'express';
import { criarSala, adicionarAlunoNaSala, listarAlunosSemSala, listarAlunosDaSala, getMapaAluno, deletarSalaPorNome } from '../controllers/SalaController';

const router = Router();

router.post('/criar', criarSala);
router.get('/alunos-disponiveis', listarAlunosSemSala); // Para carregar a lista no seu modal/página
router.patch('/adicionar-aluno', adicionarAlunoNaSala); // Para o botão "Adicionar"
router.get('/:salaId/alunos', listarAlunosDaSala);
router.get('/mapa/:usuarioId', getMapaAluno);
router.delete('/nome/:nome', deletarSalaPorNome);

export default router;