const {Router} = require('express');
const {check} = require ('express-validator');

const {ExisteProductoid} = require ('../helpers/db-validators');
const {  validaJWT } = require('../middlewares');
const{crearProducto,obtenerProductos,actualizarProducto,productoDelete,obtenerProducto}= require('../controllers/productos');
const{ExisteCategoriaid}=require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.post('/',[
validaJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('categoria','no es un id de categoria').isMongoId(),
check('categoria').custom(ExisteCategoriaid),
validarCampos
],crearProducto);

router.get('/',obtenerProducto);
obtenerProducto
router.get('/:id',[
check('id','no es un is de mongo').isMongoId(),
check('id').custom(ExisteProductoid),
validarCampos
] ,obtenerProductos);
router.put('/:id', [
    validaJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
   // check('id','No es unid valido').isMongoId(),
    check('id').custom(ExisteProductoid),
    validarCampos
],actualizarProducto);

router.delete('/:id',[
    validaJWT,
   // esRolvalido,
    check('id','no es valido el id').isMongoId(),
    check('id').custom(ExisteProductoid),
    
    validarCampos
],productoDelete);

module.exports= router;