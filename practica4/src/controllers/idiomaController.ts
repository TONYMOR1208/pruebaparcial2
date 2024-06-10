
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los idiomas
export const getAllIdiomas = async (req: Request, res: Response) => {
  try {
    const idiomas = await prisma.idioma.findMany({
      where: {
        estado: {
          not: "ELIMINADO"
        }
      }
    });
    res.status(200).json(idiomas);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los idiomas', error: error.message });
  }
};

// Obtener un idioma por su ID
export const getIdiomaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const idioma = await prisma.idioma.findUnique({ where: { id: Number(id) } });
    if (!idioma || idioma.estado === 'ELIMINADO') {
      return res.status(404).json({ message: 'Idioma no encontrado' });
    }
    res.status(200).json(idioma);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el idioma', error: error.message });
  }
};

// Crear un nuevo idioma
export const createIdioma = async (req: Request, res: Response) => {
  const { descripcion } = req.body;
  try {
    const idioma = await prisma.idioma.create({
      data: { descripcion },
    });
    res.status(201).json(idioma);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el idioma', error: error.message });
  }
};

// Actualizar un idioma existente
export const updateIdioma = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { descripcion } = req.body;
  try {
    const updatedIdioma = await prisma.idioma.update({
      where: { id: Number(id) },
      data: { descripcion },
    });
    res.status(200).json(updatedIdioma);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el idioma', error: error.message });
  }
};

// Eliminar un idioma
export const deleteIdioma = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedIdioma = await prisma.idioma.update({
      where: { id: Number(id) },
      data: { estado: 'ELIMINADO' },
    });
    res.status(200).json(deletedIdioma);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el idioma', error: error.message });
  }
};



