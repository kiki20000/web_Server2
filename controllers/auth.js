
const {response} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require ('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req, res = response) => {

    const {correo, password } = req.body;

    try {

        //Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        //Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - false'
            });
        }

        //Verificar la contraseña
        const contrasenyavalida = bcryptjs.compareSync(password, usuario.password);
        if(!contrasenyavalida){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            });
        }


        //Generar el JWT
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}



module.exports = {

    login

}













