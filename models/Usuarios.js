const mongoose= require('mongoose')
const Schema= mongoose.Schema

const UsusariosSchema= new Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    nombre:{
        type:String,
        required:'Agrega Tu nombre'
        
    },
    password:{
        type:String,
        require:'Agrega un password'
    }
})
module.exports = mongoose.model('Usuarios', UsusariosSchema)