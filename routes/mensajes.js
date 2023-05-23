const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getChat } = require('../controller/mensajes');

const router = Router();

router.get('/:from', validarJWT, getChat);

module.exports = router;