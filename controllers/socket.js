const Usuario = require('../models/usuario.js');


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


module.exports = {
    usuarioConectado,
    usuarioDesconectado
}