const Role  =require ('../models/roles');
const Usuario = require('../models/usuario');
 
const esRolvalido  = async (rol= '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error( `el rol${rol}no esta registrado en base de datos`)
    }

}

const validarCorreos = async(correo ='',req, res) =>{

const existeEmail = await Usuario.findOne({correo});
if (existeEmail){
  
   throw new Error( `el correo${correo} ya esta resgistrado en la base  de datos`)
}
}

const ExisteUsuarioPorid= async(id)=>{
    const existeUsuari = await Usuario.findById(id);
if (!existeUsuari){
  
   throw new Error( `el id : ${id}  no esxiste`);
}

}
module.exports ={
    esRolvalido,validarCorreos,ExisteUsuarioPorid
}