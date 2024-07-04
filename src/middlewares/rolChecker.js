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

        const response = await axios.post("https://microauth-k8bm.onrender.com/api/auth/verifyPermits", body, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJsdWlzQGx1aXMuY29tIiwibm9tYnJlIjoiTHVpcyIsInRpcG8iOiJJbnZlcnNvciIsImlhdCI6MTcyMDA2NjQ4NSwiZXhwIjoxNzIwMzI1Njg1fQ.WajEcopadxj6nQ_WjVlK9peVgDqqPyml1evUTfb6LfI"
            }
        })
        req.log.info(response);

        return response

    }
    catch (e) {
        throw e.response.data.error
    }

}


// Middleware encargado de la obtención de los roles
export const rolChecker = (allowedRoles) => {

    return async (req, res, next) => {

        try {

            const {email, password} = req.body
            const response = await getRoleFromUser(email, password)
            req.log.info(response);

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
