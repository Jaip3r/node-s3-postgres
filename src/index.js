import app from "./app.js";
import http from "node:http";
import config from "./config/config.js";

// Creamos el servidor
const server = http.createServer(app);

// Función de ejecución del servidor
const startServer = () => {

    try {

        // Inicializar el servidor
        server.listen(config.PORT, () => {
            console.log(`Server listening on port ${config.PORT}`);
        });
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

};

// Llamada a la función principal
startServer();