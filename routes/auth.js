const { Router } = require('express');
const { check, body } = require('express-validator');
const router = Router();
const {crearUsuario, login, renewToken} = require('../controllers/auth.js');
const {validarCampos} = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');

router.post('/api/login/new',[
    // esta forma sirve cuando mandas datos en formato raw
    check('nombre', 'El nombre debe de ser obligatorio').not().isEmpty(),
    validarCampos,
    check('email', 'El email debe de ser obligatorio').not().isEmpty(),
    validarCampos,
    check('email', 'Formato de email incorrecto').isEmail(),
    validarCampos,
    check('password', 'El password debe de ser obligatorio').not().isEmpty(),
    validarCampos
]
,crearUsuario);


router.post('/api/login',[
    check('email', 'El email es obligatorio').not().isEmpty(),
    validarCampos,
    check('password', 'El password debe de ser obligatorio').not().isEmpty(),
    validarCampos,
    check('email', 'Email no válido').isEmail(),
    validarCampos
],login);


router.get('/api/login/renew',[
    validarJWT
],renewToken);

module.exports = router;

