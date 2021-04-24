const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const validarJWT = ( req = request, res = response, next ) => {
    // leer el token
    const token = req.header('token');

    if( !token ) {
        // 401 unAuthorized
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try{
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;

        next();
    } catch(err) {
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        });
    } 

    
};

module.exports = {
    validarJWT
}