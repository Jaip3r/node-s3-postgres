import Archivo from "../models/Archivo.js";
import config from "../config/config.js";
import { s3Client } from '../libs/s3.js';

/**
 * Función encargada de obtener todos los archivos registrados
 * 
 * @async
 * @function getAll
 * @returns { Promise<Archivo[]> } Una promesa que resuelve un arreglo de archivos 
 */
export const getAll = async () => {
    return await Archivo.findAll();
};

/**
 * Función encargada de obtener un único archivo por su identificador
 * 
 * @async
 * @function getById
 * @param { number } id - Indetificador del archivo a obtener
 * @returns { Promise<Archivo|null> } Una promesa que resuelve un archivo si se encuentra o null en caso contrario
 */
export const getById = async (id) => {
    return await Archivo.findByPk(id); 
};

/**
 * Función encargada de registrar un nuevo archivo
 * 
 * @async
 * @function create
 * @param { object } file - Archivo a cargar
 * @returns { Promise<Archivo> } Una promesa que resuelve el archivo creado
 */
export const create = async (file) => {
    return await Archivo.create(file);
}

/**
 * Función encargada de actualizar un archivo especifico
 * 
 * @async
 * @function updateById
 * @param { number } id - Identificador del archivo a actualizar
 * @param { object } file - Nuevo archivo
 * @returns { Promise<Archivo> } Una promesa que resuelve el archivo actualizado
 */
export const updateById = async (id, file) => {
    return await Archivo.update(file);
}

/**
 * Función encargada de eliminar un archivo especifico
 * 
 * @param { number } id - Identificador del archivo a eliminar 
 * @returns { Promise<Archivo> } Una promesa que resuelve el archivo eliminado
 */
export const deleteById = async (id) => {
    return await Archivo.destroy(id);
}