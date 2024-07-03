import pino from "pino";
import moment from "moment-timezone";

// Fecha zona horaria Colombia
const fecha = moment().tz('America/Bogota').format("MMM Do YYYY hA");

// Configuración pino
const logger = pino({
    transport: {
        target: "pino-pretty"
    },
    base: {
        pid: false
    },
    timestamp: () => `, "time": "${fecha}"`
});

export default logger;