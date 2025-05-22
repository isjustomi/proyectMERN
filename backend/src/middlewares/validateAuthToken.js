import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

export const validateAuthToken = (allowedUserTypes = [])=>{
    return (req, res, next) =>{
        try {
            //extraer el toke de las cookies
            const {authToken} = req.cookies;

            //si no existe token, mensaje de error
            if (!authToken) {
                res.json({message: "No auth token found, you must log in"})
            }

            //Extraer la informacion del token
            const decoded = jsonwebtoken.verify(authToken, config.JWT.secret)

            //verificar si el rol puede ingresar o no
            if(!allowedUserTypes.includes(decoded.userType)){
                return res.json({message: "Acces denied"})
            }

            next()
        } catch (error) {
            console.log("error"+error)
        }
    }
}

