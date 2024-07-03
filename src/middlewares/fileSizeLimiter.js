/** Limite de tamaño */
const MB = 5;
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;


/** Middleware encargado de verificar que todos los archivos se encuentren dentro de los limites */

const fileSizeLimiter = (req, res, next) => {

    // Obtenemos los archivos
    const singleFile = req.file;
    const multipleFiles = req.files;

    // Determinamos si el tamaño sobrepasa el limite especificado dependiento del caso
    if (singleFile) {

        // Caso de un solo archivo
        if (singleFile.size > FILE_SIZE_LIMIT) {
            const errorMessage = `Error al cargar el archivo. ${singleFile.originalname} está por encima del límite de ${MB} MB.`;
            return res.status(400).json({
                success: false,
                message: errorMessage,
                data: null
            });
        }

    } else if (multipleFiles) {

        // Caso de múltiples archivos
        const oversizedFiles = files.filter(file => file.size > FILE_SIZE_LIMIT)
                .map(file => file.originalname)
                .join(', ');

        if (oversizedFiles.length > 0) {
            const errorMessage = `Error al cargar los archivos. ${oversizedFiles} están por encima del límite de ${MB} MB.`;
            return res.status(400).json({
                success: false,
                message: errorMessage,
                data: null
            });
        }

    }

    next();

};

export default fileSizeLimiter;