import { Router } from 'express';
import { getAllIdiomas, getIdiomaById, createIdioma, updateIdioma, deleteIdioma } from '../controllers';

const router = Router();

router.get('/', getAllIdiomas);
router.get('/:id', getIdiomaById);
router.post('/', createIdioma);
router.put('/:id', updateIdioma);
router.delete('/:id', deleteIdioma);

export default router;
