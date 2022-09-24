const { response } = require("express");

const { ObjectId } = require('mongoose').Types;
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const { Producto } = require("../models");

const coleccionPermitidas =[
    'usuarios',
    'categorias',
    'productos',
    
];

const buscarUsuarios = async (termino ='', res =  response)=>{
const esMongoID = ObjectId.isValid(termino);
if(esMongoID){
   const usuario = await Usuario.findById(termino);
  return res.json({
    results:(usuario) ?[usuario]:[]
   })
  
}
const regex = new RegExp(termino, 'i');

const usuarios = await Usuario.find({
    $or:[{nombre: regex},{correo: regex}],
    $and:[{estado: true}]
})
res.json({
    results:usuarios
});

}
const buscarcategorias = async (termino ='', res =  response)=>{
    const esMongoID = ObjectId.isValid(termino);
    if(esMongoID){
       const categoria = await Categoria.findById(termino).populate('categoria','nombre');
      return res.json({
        results:(categoria) ?[categoria]:[]
       })
      
    }
    const regex = new RegExp(termino, 'i');
    
    const categorias = await Categoria.find({nombre: regex,estado:true })
    res.json({
        results:categorias
    });
    
    }
    const buscarproductos = async (termino ='', res =  response)=>{
        const esMongoID = ObjectId.isValid(termino);
        if(esMongoID){
           const producto = await Producto.findById(termino).populate('productos','nombre');
          return res.json({
            results:(producto) ?[producto]:[]
           })
          
        }
        const regex = new RegExp(termino, 'i');
        
        const productos = await Producto.find({
            $or:[{nombre: regex},{correo: regex}],
            $and:[{estado: true}]
        })
        res.json({
            results:productos
        });
        
        }

const buscar =  (req,res = response) =>{

    const {coleccion,termino}  =req.params;
    if( !coleccionPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`las colecciones permitas son${coleccionPermitidas}`,

        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res);
        break;    
        case 'categorias':
            buscarcategorias(termino,res);
        break;    
        case 'productos':
            buscarproductos(termino,res);
        break;    
        case 'roles':
        break;    
        default:
            res.status(500).json({
                msg :'se me olvido hacer esta busqueda'
            })
    }
   
}
module.exports={buscar}