import { Sequelize } from 'sequelize';
import config from './config.js';

const { DATABASE, USERNAME, PASSWORD, HOST, DB_PORT } = config;

// Creamos la instancia de conexión
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    port: DB_PORT,
    pool: {
        max: 70,
        min: 0,
        acquire: 350, // Tiempo requerido para buscar una conexión libre
        idle: 10000 // Tiempo maximo en el que una conexión esta inactiva
    },
    logging: false
});


// Exportamos el objeto de conexión
export default sequelize;
