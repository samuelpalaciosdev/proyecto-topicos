import { Router } from 'express';
import { getChisteByFuente } from '../controllers/chiste-controller';
import { createChiste, getChisteById } from '../controllers/chiste-controller';

const router = Router();

router.get('/fuente/:fuente', getChisteByFuente);
router.get('/:id', getChisteById);
router.post('/', createChiste);

export default router;
