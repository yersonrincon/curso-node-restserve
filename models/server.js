const express = require('express');
const cors= require('cors');
const { dbConecction } = require('../database/config');
class Server{


    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        /*this.paths ={
            auth:'/api/auth',
            categorias:'api/categorias',
            usuarios :'api/usuarios',
        }*/
       this.usuariosPath ='/api/usuarios';
       this.authPath ='/api/auth';
       this.categoriasPath='/api/categorias';
       this.productosPath='/api/productos';
       this.buscarPath='/api/buscar';

        // conectar basa de datos
        this.conectarDB();
        //Middleware
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
  
    }
    async conectarDB(){
        await dbConecction();
    }
    middlewares(){
        //cors
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    } 
    routes(){

    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.categoriasPath, require('../routes/categorias'));
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
    this.app.use(this.productosPath, require('../routes/productos'));
    this.app.use(this.buscarPath, require('../routes/buscar'));

    }
    listen(){
    this.app.listen(this.port,()=>{
        console.log('puerto corriento en',this.port);
    });
}
}
module.exports= Server;