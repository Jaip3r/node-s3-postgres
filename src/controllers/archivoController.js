import { getAll, getById, upload, updateFile, deleteById } from '../services/archivo.service.js';

export const getAllFiles = async (req, res, next) => {

    try {

        // Obtenermos los archivos
        const files = await getAll();

        // Respondemos al usuario
        res.status(200).json({
            success: true,
            message: 'Archivos obtenidos exitosamente',
            data: files
        });
        
    } catch (error) {
        const errorGetFiles = new Error(`Ocurrio un problema al obtener los archivos - ${error.message}`);
        errorGetFiles.stack = error.stack; 
        next(errorGetFiles);
    }

};

export const getFileById = async (req, res, next) => {

    try {
        
        // Obtenemos el identificador del parametro de red
        const { id } = req.params;

        // Obtenemos el archivo 
        const file = await getById(req, id, res);

        // Respondemos al usuario
        res.status(200).json({
            success: true,
            message: 'Archivo obtenido exitosamente',
            data: file
        });

    } catch (error) {
        next(error);        
    }

};

export const uploadFiles = async (req, res , next) => {

    try {
        
        // Obtenemos los archivos a cargar 
        const { files } = req;

        // Cargamos los archivos
        const filesLoaded = await upload(files, res);

        // Respondemos al usuario
        return res.status(200).json({
            success: false,
            message: "Archivos cargados correctamente",
            data: filesLoaded
        });

    } catch (error) {
        const errorUpload = new Error(`Ocurrio un problema al cargar los archivos - ${error.message}`);
        errorUpload.stack = error.stack; 
        next(errorUpload);
    }

};

export const updateFileById = async (req, res , next) => {

    try {
        
        // Obtenemos el archivo
        const { 
            file 
        } = req;

        // Registramos el nuevo archivo
        const newFile = await updateFile(file, res);

        // Respondemos al usuario
        res.status(200).json({
            success: true,
            message: 'Archivo actualiazado exitosamente',
            data: newFile
        });

    } catch (error) {
        next(error);
    }

}

export const deleteFileById = async (req, res, next) => {

    try {

        // Obtenemos el identificador del archivo
        const { id } = req.params;

        // Eliminamos el archivo
        const deletedFile = await deleteById(req, id, res);

        // Respondemos al usuario
        res.status(200).json({
            success: true,
            message: 'Archivo eliminado exitosamente',
            data: deletedFile
        });
        
    } catch (error) {
        next(error);
    }

};