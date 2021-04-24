
// next es un callback que le va a avisar a express que si todo sale bien, 

const { validationResult } = require("express-validator");

// que continue con el siguiente middleware
const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    // let dummy = errores.mapped().nombre;
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${location}[${param}]: ${msg}`;
      };
    const result = errores.formatWith(errorFormatter);
    console.log(result);
    // resultObject = result[0];
    // let msg = resultObject.msg;
    if( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            msg: result.array()[0]  
        });
    }
    next();
};

module.exports = {
    validarCampos
};