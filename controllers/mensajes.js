const { response, request } = require('express');
const Mensaje = require('../models/mensajes');

const obtenerChat =  async (req = request, res = response ) => {
    // Para saber cual es mi id
    const miId =req.uid;
    const mensajeDe = req.params.de;

    res.json({
        ok: true,
        msg: 'hola mundo'
    });
}



module.exports = {
    obtenerChat
}