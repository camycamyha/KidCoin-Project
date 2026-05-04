import { Router } from 'express';
import { getMapa } from '../controllers/ModuloController';

const router = Router();

router.get('/mapa', getMapa);

export default router;