
const { response } = require('express');



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


const usuariosPost = (req, res = response) => {

    const {nombre, edad}  = req.body;

    res.json({
        msg: 'post API - controlador ',
        nombre, 
        edad
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