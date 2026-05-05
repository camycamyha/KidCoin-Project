import { Router } from 'express';
import { atualizarModulo, criarModulo, listarModulos } from '../controllers/ModuloController';

const router = Router();

router.get('/', listarModulos);
router.post('/criar', criarModulo);
// Rota de Update (usamos o método PUT ou PATCH)
router.put('/:id', atualizarModulo);

export default router;