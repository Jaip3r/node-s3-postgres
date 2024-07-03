/** Middleware encargado de verificar que se hayan pasado archivos */

const filePayloadExists = (req, res, next) => {

    const errorMessage = "Archivo(s) no proporcionado";

    if ((!req.file && (!req.files || req.files.length === 0))) {
        return res.status(400).json({
            success: false,
            message: errorMessage,
            data: null
        });
    }

    next();

};


export default filePayloadExists;