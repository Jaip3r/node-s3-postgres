import multer from "multer";

const errorHandler = (error, req, res, next) => {

    if (error instanceof multer.MulterError && error.code === 'LIMIT_UNEXPECTED_FILE'){
        return res.status(400).json({
            success: false,
            message: "Solo esta permitida la carga de 4 archivos en simultáneo",
            data: null
        });
    }

    req.log.error(error, `Error inesperado: ${error.message}`);
    return res.status(500).json({
        success: false,
        message: error.message,
        data: null
    });

};

export default errorHandler;