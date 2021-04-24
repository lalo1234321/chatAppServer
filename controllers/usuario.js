const { request, response } = require('express');
const Usuario = require('../models/usuario.js');

const getUsuarios = async ( req = request, res = response ) => {
    // {ok: true, msg: 'getUsuarios'}
    // .sort("-online") para mostrar primero a los que están en linea
    const usuarios = await Usuario
                            .find({ _id: { $ne: req.uid } })//para obetener todos los registros excepto el mio
                            .sort('-online');

    res.status(200).json({
        ok: true,
        usuarios
    });
};

module.exports = {
    getUsuarios
};