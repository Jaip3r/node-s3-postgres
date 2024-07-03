import axios from "axios"

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
        const response = await axios.post("https://microauth-k8bm.onrender.com/api/auth/verifyPermits", body)

        return response
    }
    catch (e) {
        throw e
    }
}


// Middleware encargado de la comprobación de los roles
const rolChecker = (req, res, next) => {
    try {
        const {email, password} = req.body
        req.rol = getRoleFromUser(email, password)
    }
    catch (e) {
        //Mostrar error 
    }
}
