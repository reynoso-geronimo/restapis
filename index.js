const express = require('express')
const routes = require('./routes/')
const mongoose= require ('mongoose')
const cors=require('cors')
require('dotenv').config({path:'variables.env'})

mongoose.Promise= global.Promise
mongoose.connect('mongodb+srv://GeroR:merntask@cluster0.dbl8b.mongodb.net/restapis',{
    useNewUrlParser:true
})




const app = express();


//habilitar cors


const whitelist = [process.env.FRONTEND_URL]

const corsOptions ={
   
    origin:(origin,callback)=>{
        const existe= whitelist.some( dominio => dominio === origin);
    
        if(existe||origin === undefined){
            callback(null,true)
        }else{
            callback(new Error('no Permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/', routes())

app.use(express.static('uploads'))

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000

app.listen(port,host, ()=>{
    console.log(`iniciando en el puerto ${port}`)
});