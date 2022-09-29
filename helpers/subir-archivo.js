const path = require ('path');
const{ v4:uuidv4} = require('uuid');
const subirArchivo =(files,extensionesValidas =['png','jpg','jpeg','gif'], carpeta = '')=>{
 return  new Promise((resolve,reject)=>{
    const{archivo} = files;

    const nombreCordato = archivo.name.split('.');
    const  extension = nombreCordato[nombreCordato.length -1];
    //Valiadr la extension 

    if(!extensionesValidas.includes(extension)){
 
     return reject(`la extesion ${extension}  no es permitida - ${extensionesValidas}`);
   
    }
  const nombreTepmp = uuidv4 () +'.'+ extension;
    const uploadPath = path.join( __dirname, '../uploads/',carpeta, nombreTepmp);
 
   archivo.mv(uploadPath, (err) => {
     if (err) {
       reject (err);
     }
   resolve(nombreTepmp)
    
   });
 })

 
}

module.exports={
    subirArchivo
}