const jwt = require ('jsonwebtoken');
const generarJWT =(uid='')=>{
    return new Promise((resolse,reject)=>{
      const payload ={uid};
      jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
        expiresIn:'2h'
      },(err,token)=>{
        if(err){
            console.log(err);
            reject('No se pudo generar el token')
        }else{
            resolse(token);
        }
      })

    })

}

module.exports={
    generarJWT
}