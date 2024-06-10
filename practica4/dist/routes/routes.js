"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const idiomaRoutes_1 = __importDefault(require("./idiomaRoutes"));
const palabraRoutes_1 = __importDefault(require("./palabraRoutes"));
const registroRoutes_1 = __importDefault(require("./registroRoutes"));
const router = express_1.default.Router();
router.use('/idiomas', idiomaRoutes_1.default);
router.use('/palabras', palabraRoutes_1.default);
router.use('/registros', registroRoutes_1.default);
exports.default = router;
