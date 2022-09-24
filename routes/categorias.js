const {Router} = require('express');
const {check} = require ('express-validator');
const { crearCategoria } = require('../controllers/categorias');
const {ExisteCategoriaid,esRolvalido} = require ('../helpers/db-validators');
const {  validaJWT } = require('../middlewares');
const{categoriaDelete,obtenerCategorias,categoriaPut,obtenerCategoria}= require('../controllers/categorias')
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

/*{{url}}/api/categorias*/
//obtener servico publico
router.get('/', obtenerCategoria);
//obtener una categoria por id_ publio
router.get('/:id',[
    check('id','no es un id  de mongo').isMongoId(),
    check ('id').custom(ExisteCategoriaid),
    validarCampos
    
],obtenerCategorias
 );
//crear categoria -privado cualquier persona con un token valido

router.post('/',[
validaJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos
],crearCategoria);
 //actualizar privado cualquier token valido
router.put('/:id', [
    validaJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
   // check('id','No es unid valido').isMongoId(),
    check('id').custom(ExisteCategoriaid),
    validarCampos
],categoriaPut);
// borrar categoria admin
router.delete('/:id',[
    validaJWT,
   // esRolvalido,
    check('id','no es valido el id').isMongoId(),
    check('id').custom(ExisteCategoriaid),
    
    validarCampos
],categoriaDelete);

module.exports= router;