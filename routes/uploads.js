const {Router} = require('express');
const {check} = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {cargarArchivos}= require ('../controllers/uploads');
const {actualizarImagenes,actualizarImagenesCloudinary,mostrarImagen} = require('../controllers/uploads');
const {coleccionesPermitidas}= require('../helpers/db-validators');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');


const router = Router();

router.post('/',validarArchivoSubir,cargarArchivos);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','el id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],//actualizarImagenes
actualizarImagenesCloudinary)


router.get('/:coleccion/:id',[
    check('id','el id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen) 
   

module.exports = router;

