import { getAll, getById, create, updateById, deleteById } from '../services/archivo.service.js';

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
        next(error);
    }

};

export const getFileById = async (req, res, next) => {

    try {
        
        // Obtenemos el identificador del parametro de red
        const { id } = req.params;

        // Obtenemos el archivo 
        const file = await getById(id);

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

export const createFile = async (req, res , next) => {

    try {
        
        // Obtenemos el archivo
        const { file } = req;

        // Registramos el nuevo archivo
        const newFile = await create(file);

        // Respondemos al usuario
        res.status(200).json({
            success: true,
            message: 'Archivo registrado exitosamente',
            data: newFile
        });

    } catch (error) {
        next(error);
    }

};

export const updateFileById = async (req, res , next) => {

    try {
        
        // Obtenemos el archivo
        const { 
            params: { id },
            file 
        } = req;

        // Registramos el nuevo archivo
        const newFile = await updateById(id, file);

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
        const deletedFile = await deleteById(id);

        // Respondemos al usuario
        res.status(200).json({
            success: true,
            message: 'Archivo eliminado exitosamente',
            data: deleteById
        });
        
    } catch (error) {
        next(error);
    }

};