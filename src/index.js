import app from "./app.js";
import http from "node:http";
import config from "./config/config.js";
import logger from "./libs/logger.js";

// Creamos el servidor
const server = http.createServer(app);

// Función de ejecución del servidor
const startServer = () => {

    try {

        // Inicializar el servidor
        server.listen(config.PORT, () => {
            logger.info(`Server listening on port ${config.PORT}`);
        });
        
    } catch (error) {
        logger.error(error, `Error al intentar inicar el servidor`);
        process.exit(1);
    }

};

// Llamada a la función principal
startServer();