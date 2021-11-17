const Pedidos= require('../models/Pedidos')

exports.nuevoPedido=async(req,res,next)=>{
   const pedido = new Pedidos(req.body)
   try {
       pedido.save()
       res.json({mensaje:"Se agrego un nuevo pedido"})
   } catch (error) {
       console.log(error)
       return next()
   }
    
} 

exports.mostrarPedidos=async(req,res,next)=>{
    try {
      const pedidos= await Pedidos.find({}).populate('cliente').populate({
          path:'pedido.producto',
          model:'Productos'
      })
  
      res.json(pedidos)
    } catch (error) {
      console.log(error)
      return next()
    }
  }
  exports.mostrarPedido=async(req,res,next)=>{
   
      const pedido= await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
          path:'pedido.producto',
          model:'Productos'
      })
      if(!pedido){
          res.json({mensaje:'Ese Pedido no existe'})
          return next()
      }
      res.json(pedido)
      return next()
 
  }

  exports.actualizarPedido=async(req,res,nest)=>{
      try {
        let pedido =  await Pedidos.findByIdAndUpdate({_id:req.params.idPedido},req.body,{
            new:true
        }).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        })
        res.json(pedido)
      } catch (error) {
          console.log(error)
          next()
      }
  }
  exports.eliminarPedido=async(req,res,next)=>{
      try {
          await Pedidos.findOneAndDelete({_id:req.params.idPedido})
          res.json({mensaje:"El pedido se a eliminado"})
      } catch (error) {
          console.log(error)
          next()
      }
  }