const {subirArchivo} = require ('../helpers/subir-archivo');
const path = require('path');
const fs = require('fs');
const cloudinary = require ('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const{response} = require ('express');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const cargarArchivos= async(req,res = response) =>{

 try {
  //const nombre = await subirArchivo(req.files,['txt','md','textos']);
  const nombre = await subirArchivo(req.files,undefined,'imgs');
  res.json({ nombre});
  
  
 } catch (msg) {
  res.status(400).json({msg});

  
 }
 
 /* if (!req.files.archivo ) {
    res.status(400).send({msg:'No hay archivos en la peticion.'});
    return;
  }*/
 
}

const actualizarImagenes = async(req,res =response) =>{
  

const {id,coleccion} = req.params;
let modelo;
switch (coleccion) {
  case 'usuarios':
    modelo = await Usuario.findById(id);
    if(!modelo){
      return res.status(400).json({msg:`el id ${modelo} no es valido `});
    }

    break;

    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo){
        return res.status(400).json({msg:`el pruducto id  ${modelo} no es valido `});
      }
     
      break;

      default:
  

   return res.status(500).json({ msg:`error al validar img`});

}


// limpiar imagenes previas

if (modelo.img){
  // hay que borrar imagen del servidor
   const pathImagen = path.join(__dirname,'../uploads',coleccion, modelo.img)
 if(fs.existsSync(pathImagen)){
  fs.unlinkSync(pathImagen);
 }
}

const nombre = await subirArchivo(req.files,undefined,coleccion);
modelo.img= nombre;
await modelo.save();
res.json({modelo});
}

const actualizarImagenesCloudinary = async(req,res =response) =>{
  

  const {id,coleccion} = req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({msg:`el id ${modelo} no es valido `});
      }
  
      break;
  
      case 'productos':
        modelo = await Producto.findById(id);
        if(!modelo){
          return res.status(400).json({msg:`el pruducto id  ${modelo} no es valido `});
        }
       
        break;
  
        default:
    
  
     return res.status(500).json({ msg:`error al validar img`});
  
  }
  
  
  // limpiar imagenes previas
  
  if (modelo.img){
    const nombreArr = modelo.img.split('/');
    const nombre  = nombreArr[nombreArr.length -1];
    const [public_id] = nombre.split('.');
     cloudinary.uploader.destroy( public_id );
     console.log(public_id);
    

   }

   const{tempFilePath}= req.files.archivo
   const {secure_url}= await  cloudinary.uploader.upload(tempFilePath)
     //cloudinary.uploader.upload()
     await modelo.save();

      res.json(modelo);
  //    modelo.img= nombre;
   //   await modelo.save();
   //   res.json({modelo});
  }
  
 
 
  
  

const mostrarImagen = async ( req,res= response)=>{
  const {id,coleccion} = req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({msg:`el id ${id} no es valido `});
      }
  
      break;
  
      case 'productos':
       
        modelo = await Producto.findById(id);
        
        if(!modelo){
          return res.status(400).json({msg:`el pruducto id  ${id} no es valido `});
        }
       
        break;
  
        default:
    
  
     return res.status(500).json({ msg:`error al validar img`});
     

  }
  
  
  // limpiar imagenes previas
  
  if (modelo.img){
    // hay que borrar imagen del servidor
     const pathImagen = path.join(__dirname,'../uploads',coleccion, modelo.img)
   if(fs.existsSync(pathImagen)){
   return   res.sendFile(pathImagen)
   }
  }


     const  pathImagen = path.join(__dirname,'../assets/no-image.jpg');
     res.sendFile(pathImagen);
      
      
  
  
 

}



module.exports= {
    cargarArchivos,actualizarImagenes,mostrarImagen,actualizarImagenesCloudinary
}