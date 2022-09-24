const { response } = require("express");
const{Categoria} = require('../models');


//onbtenrCategoria
const obtenerCategoria =async(req,res= response)=>{
    const {limite =5,desde = 0} = req.query;
 const query = {estado:true};

 const [total,categoria] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
//.populate('usuario','nombre')
 .skip(Number(desde))
 .limit(Number(limite))



 ]);
 res.json({
   
    total,
    categoria
      //  msg:'get API controlador',
    //   q,nombre,apikey,page,limit
    });
}


//obtener categorias- total - populate
const obtenerCategorias= async ( req , res = response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id);
    res.json(categoria);
}
// actualizar categoria
const categoriaPut = async(req,res)=>{
    const{id}= req.params;
    const{estado,usuario, ...data}=req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const  categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});
    res.json({
        categoria
    });
}

//borrarCategoria - estado false 
const  categoriaDelete= async( req,res = response)=>
{
    const { id } = req.params;
    
const categoria = await Categoria.findByIdAndUpdate( id,{estado:false},{new: true});
res.json({categoria});
}
// crear categoria
const crearCategoria= async (req, res = response) =>{
 const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
if(categoriaDB){
    return res.status(400).json({
        msg: `La  categoria ${ categoriaDB.nombre}, ya existe`
    });

}

//gerenerar la data a guardar
const data= {
    nombre,
    usuario:req.usuario._id
}
console.log(data)
const categoria = new Categoria(data);
// guarda  datos en mongo
await categoria.save();
res.status(201).json(categoria);
}


module.exports= {
    crearCategoria,
    categoriaDelete,
    categoriaPut,
    obtenerCategoria,
    obtenerCategorias
}