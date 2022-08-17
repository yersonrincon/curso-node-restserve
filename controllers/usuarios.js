 const {response, request} = require('express');
 const usuariosGet = (req= request , res=response) =>{
    const {q,nombre,apikey,page=1,limit}= req.query;
    res.json({
     
        msg:'get API controlador',
        q,nombre,apikey,page,limit
    });}
    const usuariosPost = (req, res) =>{
        const {nombre,edad} = req.body;
        res.json({
         
            msg:'post API controlador',
            nombre,edad
        });
    }
    const usuariosPut = (req, res) =>{
        const id = req.params.id;
        res.json({
         
            msg:'put API controlador',
            id
           
        });
    }
    const usuariosPatch = (req, res) =>{
        res.json({
         
            msg:'pacth API controlador'
        });
    }
    const usuariosDelete = (req, res) =>{
        res.json({
         
            msg:'delete API controlador'
        });
    }


module.exports ={usuariosGet,
    usuariosDelete,usuariosPatch,usuariosPost,usuariosPut};