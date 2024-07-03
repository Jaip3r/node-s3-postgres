import app from "./app.js";
import http from "node:http";
import config from "./config/config.js";
import logger from "./libs/logger.js";
import sequelize from "./config/db.js";

// Creamos el servidor
const server = http.createServer(app);

// Función de ejecución del servidor
const startServer = async () => {

    try {

        // Probar conexión
        await sequelize.authenticate();
        logger.info("Conectado a la BD")

        // Inicializar el servidor
        server.listen(config.PORT, () => {
            logger.info(`Server listening on port ${config.PORT}`);
        });

        // Tiempos de espera en el servidor
        server.timeout = 30000;
        server.keepAliveTimeout = 10000;
        server.headersTimeout = 20000;
        server.requestTimeout = 15000;
        
    } catch (error) {
        logger.error(error, `Error al intentar inicar el servidor`);
        process.exit(1);
    }

};

// Llamada a la función principal
startServer();