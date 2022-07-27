
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {

    //const { maximo = 5 } = res.query;

    // const usuarios = await Usuario.find({estado: true})
    //     .limit(5);

    // const total = await Usuario.countDocuments({estado: true});

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true}).limit(5)
    ]);

    res.json({
        
        total,
        usuarios
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if(password){

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        id
    });
}


const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe
    


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar la contraseña
    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    //Lo borramos fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
}





module.exports = {

    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete

}