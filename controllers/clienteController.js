const Clientes = require ('../models/Clientes')

exports.nuevoCliente= async (req ,res,next )=>{
    const cliente = new Clientes(req.body)
    try {
       await cliente.save()
       res.json({mensaje: 'Se Agrego Correctamente'})
    } catch (error) {
        
            res.send(error)
        
        console.log(error);
        next()
    }
}

exports.mostrarClientes= async (req,res,next)=>{
    try {
        const clientes = await Clientes.find({})
        res.json(clientes)
    } catch (error) {
        console.log(error)
        next()
    }

}
exports.mostrarCliente= async (req,res,next)=>{
  
        const cliente = await Clientes.findById(req.params.idCliente)
        
        if(!cliente){
        res.json({mensaje:'No Encontrado'})
        return next()}
        res.json(cliente)

}

exports.actualizarCliente= async (req,res,next)=>{
  

    try {
        await Clientes.findByIdAndUpdate({_id:req.params.idCliente},req.body,{
            new:true
        })
        res.json({mensaje:'Cliente Actualizado'})


    } catch (error) {
        res.send(error)
        console.log(error)
        next()
    }



}
exports.eliminarCliente=async(req,res,next)=>{
    try {
        await Clientes.findOneAndDelete({_id:req.params.idCliente})
        res.json({mensaje:'Cliente Eliminado'})
    } catch (error) {
        console.log(error)
    }
}