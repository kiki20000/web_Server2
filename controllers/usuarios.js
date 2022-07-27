
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req, res = response) => {

    const params = req.query;

    res.json({
        msg: 'get API - controlador',
        params
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    });
}


const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        return res.status(400).json({
            msg: 'Ese correo ya existe'
        });
    }


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar la contraseña
    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}





module.exports = {

    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete

}