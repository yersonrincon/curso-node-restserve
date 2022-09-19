const tieneRole = require('../middlewares/validar-roles');
const validaJWT  = require('../middlewares/validar-jwt');
const validarCampos=require('../middlewares/validar-campos');



module.exports ={
    ...validarCampos,
    ...validaJWT,
    ...tieneRole,
}