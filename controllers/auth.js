const { response } = require("express");
const bcryptjs =require('bcryptjs');
const Usuario= require('../models/usuario');
const{generarJWT}= require('../helpers/generar-jwt');
const login =async (req, res=response) =>{
    const {correo, password} = req.body;
    try {


        //verificar si email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'usuario / password no son correctos- correo'
            });
        }
    
        //si el usuario esta activo
        if(usuario.estado=== false){
            return res.status(400).json({
                msg:'usuario / password  son estado false'
            });
        }
        //verificar la contraseña

   const validPassword = bcryptjs.compareSync(password,usuario.password);
   if(!validPassword){
    return res.status(400).json({
        msg:'usuario / password no es valida'
    });
   }
        //generar el token
const token = await generarJWT(usuario.id);
        res.json({
            msg :'login ok',
        usuario,
        token
        
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
        
    }


}
module.exports={
    login

}