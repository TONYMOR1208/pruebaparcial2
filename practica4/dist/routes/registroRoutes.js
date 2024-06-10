"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getAllRegistros);
router.get('/:id', controllers_1.getRegistroById);
router.post('/', controllers_1.createRegistro);
router.put('/:id', controllers_1.updateRegistro);
router.delete('/:id', controllers_1.deleteRegistro);
exports.default = router;