import { DataTypes } from 'sequelize';

// Importamos el objeto de conexión
import sequelize from '../config/db.js';

// Creamos el esquema del modelo
const Archivo = sequelize.define('Archivos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'file_name',
            msg: "El nombre de archivo proporcionado ya se encuentra registrado"
        }
    },
    imageKey: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isUrl: {
                msg: "Favor proporcionar una url de archivo válida"
            }
        }
    }
}, {
    timestamps: true
});


// Exportamos el modelo
export default Archivo;