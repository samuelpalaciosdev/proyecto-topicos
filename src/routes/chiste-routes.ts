import { Router } from 'express';
import { getChisteByFuente, putChiste } from '../controllers/chiste-controller';
import { createChiste, getChisteById } from '../controllers/chiste-controller';

const router = Router();

router.get('/fuente/:fuente', getChisteByFuente);
router.post('/', createChiste);
router.put("/:id", putChiste);
router.get('/:id', getChisteById);


export default router;
