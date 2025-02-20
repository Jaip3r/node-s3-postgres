import {Router} from "express";
import {upload} from "../libs/multer.js";

// Funciones del controlador
import {getAllFiles, getFileById, uploadFiles, updateFileById, deleteFileById} from '../controllers/archivoController.js';

// Middlewares
import filePayloadExists from "../middlewares/filePayloadExists.js";
import fileExtLimiter from "../middlewares/fileExtLimiter.js";
import fileSizeLimiter from "../middlewares/fileSizeLimiter.js";
import {rolChecker} from "../middlewares/rolChecker.js";

// Inicializamos el router
const router = Router();


// Routes

// @desc Endpoint encargado de la obtención de todos los archivos registrados
// @route GET /api/v1/archivos
router.get('/', rolChecker(["Administrador", "Inversor"]), getAllFiles);

// @desc Endpoint encargado de la obtención de un solo archivo
// @route GET /api/v1/archivos/:id
router.get('/:id', rolChecker(["Administrador", "Inversor", "Asegurador"]), getFileById);

// @desc Endpoint encargado del registro de un nuevo archivo
// @route POST /api/v1/archivos
router.post('/', upload.array("files", 4), [rolChecker(["Administrador", "Inversor"]), filePayloadExists, fileExtLimiter("application/pdf"), fileSizeLimiter], uploadFiles);

// @desc Endpoint encargado de la actualización de un archivo
// @route PATCH /api/v1/archivos
router.patch('/', upload.single("file"), [rolChecker(["Administrador", "Inversor"]), filePayloadExists, fileExtLimiter("application/pdf"), fileSizeLimiter], updateFileById);

// @desc Endpoint encargado de la eliminación de un archivo
// @route DELETE /api/v1/archivos/:id
router.delete('/:id', rolChecker(["Administrador", "Inversor"]), deleteFileById);

// Exportamos el router
export default router;
