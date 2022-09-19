
const {Router} = require('express');
const {validaJWT,validarCampos,tieneRole} = require('../middlewares');
const {esRolvalido,validarCorreos,ExisteUsuarioPorid } = require('../helpers/db-validators');
const {check} = require ('express-validator');
const Role = require('../models/roles');
const { usuariosGet, usuariosDelete,usuariosPatch,usuariosPost, usuariosPut } = require('../controllers/usuarios');
const roles = require('../models/roles');


const router= Router();


router.get('/',usuariosGet);
//usuariosDelete,usuariosPost,usuariosPut


//router.put('/:id',usuariosPut);
router.post('/',[
    check('nombre','el nombre no es obligatorio ').not().isEmpty(),
    check('password','la contraseña deve ser minimo 6 caracteres').isLength({ min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('rol','no es un rol valido ').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolvalido),
    check('correo').custom(validarCorreos),
    validarCampos
],usuariosPost);
router.put('/:id',[
check('id','No es un id valido ').isMongoId(),
check('id').custom(ExisteUsuarioPorid),
check('rol').custom(esRolvalido),
validarCampos
],usuariosPut);


router.delete('/:id',[
    validaJWT,
    tieneRole('ADMIN_ROLE','VENTAS_ROL'),
   // esAdminRole,

    check('id','No es un Id valido').isMongoId(),
    check('id').custom(ExisteUsuarioPorid),
    validarCampos
],usuariosDelete);

router.patch('/',usuariosPatch);

  /*  router.get('/',  (req, res) =>{
        res.json({
         
            msg:'get API'
        });
    });
    router.put('/',  (req, res) =>{
        res.json({
         
            msg:'put API'
        });
    });
    router.post('/',  (req, res) =>{
        res.json({
         
            msg:'post API'
        });
    });
    router.delete('/',  (req, res) =>{
        res.json({
         
            msg:'delete API'
        });
    });*/
    
      module.exports =  router;

