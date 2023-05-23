const { response } = require('express');

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const usuariosDB = await Usuario
        .find({_id: {$ne: req.uid}})
        .sort('-online')
        .skip(desde)
        .limit(20)

    try {
        res.json({
            ok: true,
            msg: 'Lista de usuarios',
            data: usuariosDB,
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
}

module.exports = {
    getUsuarios
}