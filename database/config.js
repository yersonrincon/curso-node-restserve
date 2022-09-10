const mongoose = require('mongoose');

const dbConecction = async () => {
    try {
 await mongoose.connect(process.env.MONGODB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
 });
 console.log('base de datos conectada');
        
    } catch (error) {
        console.log(error)
        throw new Error('Error de coneccion bas e de datos')
    }

}

module.exports={dbConecction};