const { Router } = require('express');
const router = Router();


const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');

router.get('/api/mensajes/:de',validarJWT, obtenerChat);
