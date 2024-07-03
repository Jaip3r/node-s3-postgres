import { S3Client } from '@aws-sdk/client-s3'; // Establece la conexión con el servicio
import config from '../config/config.js';

// Configuración de conexión a cliente s3
export const s3Client = new S3Client({
    region: config.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: config.AWS_PUBLIC_KEY,
        secretAccessKey: config.AWS_SECRET_KEY
    }
});