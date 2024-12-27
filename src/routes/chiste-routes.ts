import { Router } from 'express';
import { getChisteByFuente } from '../controllers/chiste-controller';
import { createChiste, getChisteById, putChiste } from '../controllers/chiste-controller';
import { validation } from '../middleware/middleware';
import { chisteSchema } from '../validations/chiste-schema';

const router = Router();

router.get('/fuente/:fuente', getChisteByFuente);
router.post('/', createChiste);
router.put("/:id", validation(chisteSchema), putChiste);
router.get('/:id', getChisteById);


export default router;
