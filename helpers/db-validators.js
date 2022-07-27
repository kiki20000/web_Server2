
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}


const existeEmail = async(correo = '') => {

    const email = await Usuario.findOne({correo});

    if(email){
        throw new Error(`El correo: ${correo} ya esta registrado en la BD`)
    }
}

const existeUsuarioPorId = async(id) => {

    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El usuario con id: ${id} no existe`)
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}