const { response } = require("express");
const{Producto} = require('../models');



const crearProducto= async (req, res = response) =>{
    const {nombre, ...body}= req.body
   

    const productoDB =  await Producto.findOne({nombre});
   

 
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre}, ya existe`
        });
    
    }
    //gerenerar la data a guardar
    const data= {
        ...body,
        nombre,
        usuario:req.usuario._id,
       
    }

    console.log(data)
    const producto = new Producto(data);
 
 // guardar datos en mongo
   
    await producto.save();
    res.status(201).json(producto);
}

//onbtenrCategoria

const obtenerProducto =async(req,res= response)=>{
    const {limite =5,desde = 0} = req.query;
 const query = {estado:true};

 const [total,producto] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
//.populate('usuario','nombre')
 .skip(Number(desde))
 .limit(Number(limite))



 ]);
 res.json({
   
  
    producto
    
    });
}

const obtenerProductos= async ( req , res = response)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id);
    res.json(producto);
}
const actualizarProducto = async(req,res)=>{
    const{id}= req.params;
    const{estado,usuario, ...data}=req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const  producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    res.json({
         producto
    });
}
//borrarCategoria - estado false 
const  productoDelete= async( req,res = response)=>
{
    const { id } = req.params;
    
const producto = await Producto.findByIdAndUpdate( id,{estado:false},{new: true});
res.json({producto});
}

   module.exports={
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    productoDelete
   }
   