const Usuarios= require('../models/Usuarios')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')

exports.registrarUsuario=async(req,res)=>{
   
    const usuario= new Usuarios(req.body)
    usuario.password= await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save()
        res.json({mensaje:'Usuario Creado'})
    } catch (error) {
        console.log(error)
        res.json({mensaje:'hubo un error'})
    }
}

exports.autenticarUsuario=async (req,res,next)=>{
    
    const usuario = await Usuarios.findOne({email:req.body.email})
    if(!usuario){
        await res.status(401).json({mensaje:'Credenciales erroneas'})
        return next()
    }
    else{
        if(!bcrypt.compareSync(req.body.password,usuario.password)){
            await res.status(401).json({mensaje:'Credenciales erroneas'})
            return next()
        }else{

            const token= jwt.sign({
                email:usuario.email,
                nombre:usuario.nombre,
                _id:usuario._id
            }, 'KAMESENNIN',{
                expiresIn:'1h'
            })
        await  res.json({token})
        }
    }
}