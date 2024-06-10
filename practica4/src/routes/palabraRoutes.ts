import { Router } from 'express';
import { getAllPalabras, getPalabraById, createPalabra, updatePalabra, deletePalabra } from '../controllers';

const router = Router();

router.get('/', getAllPalabras);
router.get('/:id', getPalabraById);
router.post('/', createPalabra);
router.put('/:id', updatePalabra);
router.delete('/:id', deletePalabra);

export default router;
