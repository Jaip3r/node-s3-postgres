import Archivo from "../models/Archivo.js";
import config from "../config/config.js";
import { s3Client } from '../libs/s3.js';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Función encargada de obtener todos los archivos registrados
 * 
 * @async
 * @function getAll
 * @returns { Promise<Archivo[]> } Una promesa que resuelve un arreglo de archivos 
 */
export const getAll = async () => {

    try {

        // Obtener todos los archivos de la base de datos
        const archivos = await Archivo.findAll({
            attributes: ['id', 'nombre']
        });

        // Crear una lista de promesas para obtener URLs firmadas en paralelo
        const urlPromises = archivos.map(async archivo => {

            // Generar una URL firmada del archivo
            const params = {
            Bucket: config.AWS_BUCKET_NAME,
            Key: archivo.nombre
            };

            const command = new GetObjectCommand(params);

            const url = await getSignedUrl(s3Client, command, {
            expiresIn: 50000,
            });
    
            // Agregar la URL firmada a los datos del archivo
            archivo.dataValues.image_url = url;

        });

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(urlPromises);

        // Retorna una lista con los archivos obtenidos
        return archivos;

    }catch(error) {
        throw error;
    }

};

/**
 * Función encargada de obtener un único archivo por su identificador
 * 
 * @async
 * @function getById
 * @param { object } req - Objeto solicitud al servidor
 * @param { number } id - Indetificador del archivo a obtener
 * @param { object } res - Objeto respuesta del servidor
 * @returns { Promise<Archivo> } Una promesa que resuelve un archivo si se encuentra o error en caso contrario
 */
export const getById = async (req, id, res) => {

    try {

        // Obtener el archivo
        const archivo = await Archivo.findByPk(id, {
            attributes: ['id', 'nombre']
        });

        // Verificamos su existencia
        if(!archivo){
            req.log.warn(`intento de acceso a un archivo no identificado: ${id}`);
            return res.status(400).json({
                success: false,
                message: "Archivo no identificado",
                data: null
            });
        }

        // Generar una URL firmada del archivo
        const params = {
            Bucket: config.AWS_BUCKET_NAME,
            Key: archivo.nombre
        };
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, {
        expiresIn: 50000,
        });

        // Agregar la URL firmada a los datos del archivo
        archivo.dataValues.image_url = url;

        // Retornamos la información registrada del archivo
        return archivo;

    }catch (error) {
        throw error;
    }
    
};

/**
 * Función encargada de registrar un nuevo archivo
 * 
 * @async
 * @function create
 * @param { object } files - Archivos a cargar
 * @param { object } res - Objeto respuesta del servidor
 * @returns { String[] } Una lista con los nombres de los archivos cargados
 */
export const upload = async (files, res) => {

    try { 

        // Verificar si los nombres de archivos ya existen en la base de datos
        const existingFiles = await Archivo.findAll({
            where: {
                nombre: files.map(file => file.originalname)
            }
        });

        if (existingFiles.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Uno o más archivos ya existen en la base de datos",
                data: null
            });
        }

        // Array para almacenar los nombres de archivos cargados exitosamente
        const uploadedFiles = [];
        
        // Mapea cada archivo a una promesa de carga a S3
        const uploadPromises = files.map(async file => {

            const params = {
                Bucket: config.AWS_BUCKET_NAME,
                Key: file.originalname,
                Body: file.buffer,
            };

            // Carga del archivo
            const command = new PutObjectCommand(params);
            await s3Client.send(command);

            // Creación de registro
            await Archivo.create({
                nombre: file.originalname
            });

            // Agregar el nombre del archivo a la lista de archivos cargados exitosamente
            uploadedFiles.push(file.originalname);

        });

        // Espera a que todas las promesas se resuelvan en paralelo
        await Promise.all(uploadPromises);

        // Retorna la lista de archivos cargados exitosamente
        return uploadedFiles;
    
    } catch (error) {
        throw error;
    }

}

/**
 * Función encargada de actualizar un archivo especifico
 * 
 * @async
 * @function updateById
 * @param { object } file - Nuevo archivo
 * @param { object } res - Objeto respuesta del servidor
 * @returns { Promise<Archivo> } Una promesa que resuelve el archivo actualizado
 */
export const updateFile = async (file, res) => {

    try {

        // Verificar si el archivo existe en la base de datos
        const existingFile = await Archivo.findOne({
            where: {
                nombre: file.originalname
            }
        });

        if (!existingFile) {
            return res.status(400).json({
                success: false,
                message: `El archivo ${file.originalname} no se encuentra registrado`,
                data: null
            });
        }

        // Parámetros para actualizar el archivo en S3
        const params = {
            Bucket: config.AWS_BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
        };

        // Crear y ejecutar el comando PutObjectCommand para actualizar el archivo
        const command = new PutObjectCommand(params);
        return await s3Client.send(command);
        
    } catch (error) {
        throw error;
    }

}

/**
 * Función encargada de eliminar un archivo especifico
 * 
 * @async
 * @function deleteById
 * @param { number } id - Identificador del archivo a eliminar 
 * @param { object } res - Objeto respuesta del servidor
 * @returns { Promise<Archivo> } Una promesa que resuelve el archivo eliminado
 */
export const deleteById = async (req, id, res) => {

    try {

        // Obtener el archivo
        const archivo = await Archivo.findByPk(id);

        // Verificamos su existencia
        if(!archivo){
            req.log.warn(`intento de acceso a un archivo no identificado: ${id}`);
            return res.status(400).json({
                success: false,
                message: "Archivo no identificado",
                data: null
            });
        }

        // Eliminamos el archivo de la BD
        await archivo.destroy();

        // Parámetros para eliminar el archivo en S3
        const params = {
            Bucket: config.AWS_BUCKET_NAME,
            Key: archivo.nombre
        };

        // Crear y ejecutar el comando DeleteObjectCommand para eliminar el archivo
        const command = new DeleteObjectCommand(params);
        return await s3Client.send(command);

    } catch (error) {
        throw(error);
    }

}