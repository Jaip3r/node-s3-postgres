import axios from "axios";

/**
    * @async
    * @function getRoleFromUser
    * @param email - Email del usuario a evaluar
    * @param password - Contraseña del usuario a evaluar
    * 
    * */
const getRoleFromUser = async (email, password) => {

    try {

        const body = {
            correo_personal: email,
            password: password
        }
        console.log("CUERPO SOLICITUD: " + body.correo_personal);
        console.log("CUERPO SOLICITUD2: " + body.password);

        const response = await axios.post("https://microauth-k8bm.onrender.com/api/auth/verifyPermits", body, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJsdWlzQGx1aXMuY29tIiwibm9tYnJlIjoiTHVpcyIsInRpcG8iOiJJbnZlcnNvciIsImlhdCI6MTcyMDA2ODQ5NiwiZXhwIjoxNzIwMzI3Njk2fQ.OCOiIhnQqiggKm15-cfGT-H1XbZtS9D4z-mdfDiOnso"
            }
        })
        console.log("RESPUESTA1: " + response);

        return response

    }
    catch (e) {
        console.log("ERRORRRRRRRRRRR:" + e);
        throw e.response.data.error
    }

}


// Middleware encargado de la obtención de los roles
export const rolChecker = (allowedRoles) => {

    return async (req, res, next) => {

        try {

            const {email, password} = req;
            console.log(email, password);
            console.log("CUERPO SOLICITUD: " + req);
            const response = await getRoleFromUser(email, password)

            if (allowedRoles.includes(response.data.role)) {
                next()
            } else {
                throw "El usuario actual no tiene los permisos necesarios para realizar esta acción"
            }

        }
        catch (e) {

            req.log.error(e);
            return res.status(400).json({
                success: false,
                message: e,
                data: null
            });

        }

    }

}
