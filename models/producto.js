const{ Schema,model} = require ('mongoose');

const ProductoSchema = Schema({

    nombre:{
        type: String,
        required:[true,'el nombre es obligatorio'],
        unique: true
    },
    estado:{ 
        type:Boolean,
        default: true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require: true
    },
  precio:  {
    type:Number,
    default:0,
    required:true

    },
  categoria :{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true

    },
    descripcion: { type: String},
    disponible :{ type:Boolean ,defalta: true}
});
ProductoSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
  
    return data;
}

module.exports = model('Producto',ProductoSchema);