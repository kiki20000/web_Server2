
const { Router } = require ('express');
const { check } = require('express-validator');


const { usuariosGet, usuariosPut , usuariosPost, usuariosDelete  } = require('../controllers/usuarios');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const role = require('../models/role');

const router = Router();

router.get('/',usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({min: 6}),
    check('correo', 'No parece ser un correo').isEmail(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom(existeEmail),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost);

router.delete('/:id',[
    
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos

],usuariosDelete);






module.exports = router;





