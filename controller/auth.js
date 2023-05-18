const { Router, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encripar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar mi JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Usuario creado',
            data: usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const login = async (req, res = response) => {
    
    const { email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válida'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'Usuario creado',
            data: usuarioDB,
            token
        });


        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
}

const refreshToken = async (req, res = response) => {

    // Obtener el id del usuario
    const uid = req.uid;

    // Generar un nuevo JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por el UID
    const usuarioDB = await Usuario.findById({ _id: uid });


    res.json({
        ok: true,
        data: usuarioDB,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    refreshToken
}