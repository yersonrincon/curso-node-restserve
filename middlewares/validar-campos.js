const {validationResult}=require('express-validator')

const validarCampos =(req,res,next) =>{
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
        }
next();
}
const validarEmail = async (req, res) =>{
const existeEmail = await Usuario.findOne({correo}); 
if (existeEmail){
   return res.status(400).json({
       msg:'correo ya se encuentra registrado registrado '

   })
}
}

module.exports ={
    validarCampos,validarEmail
}