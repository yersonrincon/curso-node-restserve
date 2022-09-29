const express = require('express');
const cors= require('cors');
const { dbConecction } = require('../database/config');
const fileUpload = require('express-fileupload');
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
       this.uploadsPath ='/api/uploads';
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

        // carga de archivos 
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    } 
    routes(){

    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.categoriasPath, require('../routes/categorias'));
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
    this.app.use(this.productosPath, require('../routes/productos'));
    this.app.use(this.buscarPath, require('../routes/buscar'));
    this.app.use(this.uploadsPath, require('../routes/uploads'));

    }
    listen(){
    this.app.listen(this.port,()=>{
        console.log('puerto corriento en',this.port);
    });
}
}
module.exports= Server;
