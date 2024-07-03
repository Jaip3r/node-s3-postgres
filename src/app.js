import express from 'express';
import helmet from 'helmet';
import pino from 'pino';
import pino_http from 'pino-http';
import logger from './libs/logger.js';

// Contexto principal de la aplicación
const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(pino_http({

    logger,

    // Serializers
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res
    },

    wrapSerializers: true,

    // Custom logger level
    customLogLevel: function (req, res, err) {
        if (res.statusCode === 404) return 'warn'
        else if (res.statusCode >= 300) return 'silent'; 
        return 'info';
    },

    // Mensaje de exito
    customSuccessMessage: function (req, res) {
        if (res.statusCode === 404) {
          return 'Recurso no encontrado';
        }
        return `${req.method} operacion completada`;
    },

    // Sobrescritura de las llaves del objeto log
    customAttributeKeys: {
        req: 'request',
        res: 'response',
        err: 'error',
        responseTime: 'timeTaken'
    }

}));


app.get('/', (req, res) => {
    res.json({ message: "Hola mundo" });
});


// En caso de acceder a una ruta no especificada
app.all('*', (req, res) => {

    res.status(404);

    if(req.accepts('json')){
        res.json({message: "404 Not Found"});
    }else{
        res.type('txt').send('404 Not Found');
    }

});


// Exportamos la aplicación
export default app;