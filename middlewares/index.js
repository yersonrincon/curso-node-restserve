const tieneRole = require('../middlewares/validar-roles');
const validaJWT  = require('../middlewares/validar-jwt');
const validarCampos=require('../middlewares/validar-campos');
const validarArchivoSubir=require('../middlewares/validar-archivo');



module.exports ={
    ...validarCampos,
    ...validaJWT,
    ...tieneRole,
    ...validarArchivoSubir
}