 const {response, request} = require('express');
 const bcryptjs =require ('bcryptjs');
 const Usuario = require('../models/usuario');
 const {validationResult}=require('express-validator');
 const usuariosGet =  async(req= request , res=response) =>{  const {q,nombre,apikey,page=1,limit}= req.query;
 const {limite =5,desde = 0} = req.query;
 const query = {estado:true};

 const [total,usuarios] = await Promise.all([
    Usuario.count(query),
    Usuario.find(query)
    
 .skip(Number(desde))
 .limit(Number(limite))



 ]);
 res.json({
   
    total,
    usuarios
      //  msg:'get API controlador',
    //   q,nombre,apikey,page,limit
    });}
    const usuariosPost = async (req, res) =>{

       
        const {nombre,correo,password,rol} = req.body
       const usuario = new Usuario({nombre,correo,password,rol});
    
     //verificar si el correo existe
    /*  const existeEmail = await Usuario.findOne({correo});
     if (existeEmail){
        return res.status(400).json({
            msg:'correo ya se encuentra registrado '

        })
     }*/
     //encriptar la contraseña
     const salt = bcryptjs.genSaltSync();
     usuario.password = bcryptjs.hashSync(password,salt);

     //guardar datos en bd 
     await usuario.save();
        res.json({
         
            msg:'post API controlador',
            usuario
        });
    }
    const usuariosPut =async(req, res) =>{
        const id = req.params.id;
        const {_id, password,google,correo,...resto} = req.body;
      if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);

      }
      const usuario = await Usuario.findByIdAndUpdate(id,resto);
        res.json({
         
            
            usuario
           
        });
    }
    const usuariosPatch = (req, res) =>{
        res.json({
         
            msg:'pacth API controlador'
        });
    }

    const usuariosDelete = async(req, res = response) => {

        const { id } = req.params;
  
        // Fisicamente lo borramos
        // const usuario = await Usuario.findByIdAndDelete( id );
    
        const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
   
        res.json({usuario});
    }
    

module.exports ={usuariosGet,
    usuariosDelete,usuariosPatch,usuariosPost,usuariosPut};