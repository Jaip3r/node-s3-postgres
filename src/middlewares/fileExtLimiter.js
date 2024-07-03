/** Middleware encargado de verificar las extensiones de los archivos proporcionados */

const fileExtLimiter = (allowedMymetype) => {

    return (req, res, next) => {

        const errorMessage = `Error al cargar el archivo(s). Unicamente el tipo de archivo ${allowedMymetype} esta permitido.`;

        if (req.files) {

            // Verificamos el tipo de los archivos recibidos
            const invalidFile = req.files.some(file => file.mimetype !== allowedMymetype);
            if (invalidFile) {

                return res.status(400).json({
                    success: false,
                    message: errorMessage,
                    data: null
                });

            }

        } else if (req.file) {

            // Verificamos el tipo de archivo recibido
            if (req.file.mimetype !== allowedMymetype) {
                return res.status(400).json({
                    success: false,
                    message: errorMessage,
                    data: null
                });
            }

        }

        next();

    }

};

export default fileExtLimiter;