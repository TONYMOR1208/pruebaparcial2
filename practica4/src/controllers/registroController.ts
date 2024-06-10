import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los registros
export const getAllRegistros = async (req: Request, res: Response) => {
  try {
    const registros = await prisma.registro.findMany({
      where: {
        estado: {
          not: "ELIMINADO"
        }
      }
    });
    res.status(200).json(registros);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los registros', error: error.message });
  }
};

// Obtener un registro por su ID
export const getRegistroById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const registro = await prisma.registro.findUnique({ where: { id: Number(id) } });
    if (!registro || registro.estado === 'ELIMINADO') {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.status(200).json(registro);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el registro', error: error.message });
  }
};

// Crear un nuevo registro
export const createRegistro = async (req: Request, res: Response) => {
  const { fecha, hora, ubicacion, idIdioma, idPalabra, deletreo, silabas, fonetica } = req.body;
  try {
    const nuevoRegistro = await prisma.registro.create({
      data: { fecha, hora, ubicacion, idIdioma, idPalabra, deletreo, silabas, fonetica },
    });
    res.status(201).json(nuevoRegistro);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el registro', error: error.message });
  }
};

// Actualizar un registro existente
export const updateRegistro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fecha, hora, ubicacion, deletreo, silabas, fonetica } = req.body;
  try {
    const registroActualizado = await prisma.registro.update({
      where: { id: Number(id) },
      data: { fecha, hora, ubicacion, deletreo, silabas, fonetica },
    });
    res.status(200).json(registroActualizado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el registro', error: error.message });
  }
};

// Eliminar un registro
export const deleteRegistro = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const registroEliminado = await prisma.registro.update({
      where: { id: Number(id) },
      data: { estado: 'ELIMINADO' },
    });
    res.status(200).json(registroEliminado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el registro', error: error.message });
  }
};
