const Role  =require ('../models/roles');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const { Producto } = require('../models');
const { collection } = require('../models/usuario');
 
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
const ExisteCategoriaid= async(id)=>{
    const existeCategoria = await Categoria.findById(id);
if (!existeCategoria){
  
   throw new Error( `el id : ${id}  no existe`);
} 
}
const ExisteProductoid= async(id)=>{
    const existeProducto= await Producto.findById(id);
if (!existeProducto){
  
   throw new Error( `el id : ${id}  no existe`);
} 

}

//validar colecciones
const coleccionesPermitidas = (colleccion= '',collecciones =[]) =>{
 const incluida = collecciones.includes(colleccion);

 if(!incluida){
    throw new Error(`la coleccion ${colleccion} no es permitida ${collecciones}`);
 }
 return true;
}
 

module.exports ={
    esRolvalido,validarCorreos,ExisteUsuarioPorid,ExisteCategoriaid,
    ExisteProductoid,coleccionesPermitidas
}