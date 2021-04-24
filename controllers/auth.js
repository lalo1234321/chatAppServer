const {request, response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req = request, res = response) => {
    // al usar raw en postman, podemos extraer la información por el req.body
    // let {nombre} = req.body;
    const {email, password} = req.body;
    try{

        const emailExiste = await Usuario.findOne({ email });
        if( emailExiste ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT( usuario.id );
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    // let{ nombre } = req.params
    
    // console.log(nombre);
    
    
};

const login = async (req = request, res = response) => {
    const {email, password} = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
        if( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'password no válida'
            });
        }
        
        const token = await generarJWT( usuarioDB.id );
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    } catch(err) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req = request, res = response) => {

    const uid = req.uid;
    const token = await generarJWT( uid );
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token
    });

};

module.exports = {
    crearUsuario,
    login,
    renewToken
};

