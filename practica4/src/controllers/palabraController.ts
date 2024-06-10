import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todas las palabras
export const getAllPalabras = async (req: Request, res: Response) => {
  try {
    const palabras = await prisma.palabra.findMany({
      where: {
        estado: {
          not: "ELIMINADO"
        }
      }
    });
    res.status(200).json(palabras);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener las palabras', error: error.message });
  }
};

// Obtener una palabra por su ID
export const getPalabraById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const palabra = await prisma.palabra.findUnique({ where: { id: Number(id) } });
    if (!palabra || palabra.estado === 'ELIMINADO') {
      return res.status(404).json({ message: 'Palabra no encontrada' });
    }
    res.status(200).json(palabra);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener la palabra', error: error.message });
  }
};

// Crear una nueva palabra
export const createPalabra = async (req: Request, res: Response) => {
  const { palabra, deletreo } = req.body;
  try {
    const nuevaPalabra = await prisma.palabra.create({
      data: { palabra, deletreo },
    });
    res.status(201).json(nuevaPalabra);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear la palabra', error: error.message });
  }
};

// Actualizar una palabra existente
export const updatePalabra = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { palabra, deletreo } = req.body;
  try {
    const palabraActualizada = await prisma.palabra.update({
      where: { id: Number(id) },
      data: { palabra, deletreo },
    });
    res.status(200).json(palabraActualizada);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar la palabra', error: error.message });
  }
};

// Eliminar una palabra
export const deletePalabra = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const palabraEliminada = await prisma.palabra.update({
      where: { id: Number(id) },
      data: { estado: 'ELIMINADO' },
    });
    res.status(200).json(palabraEliminada);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar la palabra', error: error.message });
  }
};
