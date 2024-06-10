import { Router } from 'express';
import { getAllRegistros, getRegistroById, createRegistro, updateRegistro, deleteRegistro } from '../controllers';

const router = Router();

router.get('/', getAllRegistros);
router.get('/:id', getRegistroById);
router.post('/', createRegistro);
router.put('/:id', updateRegistro);
router.delete('/:id', deleteRegistro);

export default router;
