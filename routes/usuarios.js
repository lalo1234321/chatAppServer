const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios } = require('../controllers/usuario.js');
const router = Router();


router.get('/api/usuarios', validarJWT, getUsuarios);

module.exports = router;