import { Router } from "express";

// Funciones del controlador
import { getAllFiles, getFileById, createFile, updateFileById, deleteFileById } from '../controllers/archivoController.js';

// Middlewares


// Inicializamos el router
const router = Router();


// Routes

// @desc Endpoint encargado de la obtención de todos los archivos registrados
// @route GET /api/v1/archivos
router.get('/', getAllFiles);

// @desc Endpoint encargado de la obtención de un solo archivo
// @route GET /api/v1/archivos/:id
router.get('/:id', getFileById);

// @desc Endpoint encargado del registro de un nuevo archivo
// @route POST /api/v1/archivos
router.post('/', createFile);

// @desc Endpoint encargado de la actualización de un archivo
// @route PATCH /api/v1/archivos/:id
router.patch('/:id', updateFileById);

// @desc Endpoint encargado de la eliminación de un archivo
// @route DELETE /api/v1/archivos/:id
router.delete('/:id', deleteFileById);

// Exportamos el router
export default router;