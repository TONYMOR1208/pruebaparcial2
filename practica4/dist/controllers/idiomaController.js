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
exports.deleteIdioma = exports.updateIdioma = exports.createIdioma = exports.getIdiomaById = exports.getAllIdiomas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los idiomas
const getAllIdiomas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idiomas = yield prisma.idioma.findMany({
            where: {
                estado: {
                    not: "ELIMINADO"
                }
            }
        });
        res.status(200).json(idiomas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los idiomas', error: error.message });
    }
});
exports.getAllIdiomas = getAllIdiomas;
// Obtener un idioma por su ID
const getIdiomaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const idioma = yield prisma.idioma.findUnique({ where: { id: Number(id) } });
        if (!idioma || idioma.estado === 'ELIMINADO') {
            return res.status(404).json({ message: 'Idioma no encontrado' });
        }
        res.status(200).json(idioma);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el idioma', error: error.message });
    }
});
exports.getIdiomaById = getIdiomaById;
// Crear un nuevo idioma
const createIdioma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion } = req.body;
    try {
        const idioma = yield prisma.idioma.create({
            data: { descripcion },
        });
        res.status(201).json(idioma);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el idioma', error: error.message });
    }
});
exports.createIdioma = createIdioma;
// Actualizar un idioma existente
const updateIdioma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { descripcion } = req.body;
    try {
        const updatedIdioma = yield prisma.idioma.update({
            where: { id: Number(id) },
            data: { descripcion },
        });
        res.status(200).json(updatedIdioma);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el idioma', error: error.message });
    }
});
exports.updateIdioma = updateIdioma;
// Eliminar un idioma
const deleteIdioma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedIdioma = yield prisma.idioma.update({
            where: { id: Number(id) },
            data: { estado: 'ELIMINADO' },
        });
        res.status(200).json(deletedIdioma);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el idioma', error: error.message });
    }
});
exports.deleteIdioma = deleteIdioma;
