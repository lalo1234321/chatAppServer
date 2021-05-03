const Usuario = require('../models/usuario.js');
const Mensaje = require('../models/mensajes.js');

const usuarioConectado = async ( uid = '' ) => {

    const usuario  = await Usuario.findById( uid );
    usuario.online = true;
    await usuario.save();
    // try{

    // } catch(err) {

    // }
    
    return usuario;
};

const usuarioDesconectado = async ( uid = '' ) => {

    const usuario  = await Usuario.findById( uid );
    usuario.online = false;
    await usuario.save();
    // try{

    // } catch(err) {

    // }
    
    return usuario;
};

const grabarMensaje = async ( payload ) => {
    try{
        const mensaje = new Mensaje( payload );
        await mensaje.save();
    } catch(err) {
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado, 
    grabarMensaje
}