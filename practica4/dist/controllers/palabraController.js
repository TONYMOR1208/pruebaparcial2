"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePalabra = exports.updatePalabra = exports.createPalabra = exports.getPalabraById = exports.getAllPalabras = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todas las palabras
const getAllPalabras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const palabras = yield prisma.palabra.findMany({
            where: {
                estado: {
                    not: "ELIMINADO"
                }
            }
        });
        res.status(200).json(palabras);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las palabras', error: error.message });
    }
});
exports.getAllPalabras = getAllPalabras;
// Obtener una palabra por su ID
const getPalabraById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const palabra = yield prisma.palabra.findUnique({ where: { id: Number(id) } });
        if (!palabra || palabra.estado === 'ELIMINADO') {
            return res.status(404).json({ message: 'Palabra no encontrada' });
        }
        res.status(200).json(palabra);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener la palabra', error: error.message });
    }
});
exports.getPalabraById = getPalabraById;
// Crear una nueva palabra
const createPalabra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { palabra, deletreo } = req.body;
    try {
        const nuevaPalabra = yield prisma.palabra.create({
            data: { palabra, deletreo },
        });
        res.status(201).json(nuevaPalabra);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la palabra', error: error.message });
    }
});
exports.createPalabra = createPalabra;
// Actualizar una palabra existente
const updatePalabra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { palabra, deletreo } = req.body;
    try {
        const palabraActualizada = yield prisma.palabra.update({
            where: { id: Number(id) },
            data: { palabra, deletreo },
        });
        res.status(200).json(palabraActualizada);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar la palabra', error: error.message });
    }
});
exports.updatePalabra = updatePalabra;
// Eliminar una palabra
const deletePalabra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const palabraEliminada = yield prisma.palabra.update({
            where: { id: Number(id) },
            data: { estado: 'ELIMINADO' },
        });
        res.status(200).json(palabraEliminada);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar la palabra', error: error.message });
    }
});
exports.deletePalabra = deletePalabra;
