const express= require('express')
const router = express.Router()
const clienteController= require('../controllers/clienteController')
const productosController= require('../controllers/productosController')
const pedidosController= require('../controllers/pedidosController')
const usuariosController=require('../controllers/usuariosController')
const auth=require('../middleware/auth')

module.exports = function(){

    router.post('/clientes',auth, clienteController.nuevoCliente)

    router.get('/clientes',auth, clienteController.mostrarClientes)

    router.get('/clientes/:idCliente',auth, clienteController.mostrarCliente)

    router.put('/clientes/:idCliente',auth, clienteController.actualizarCliente)

    router.delete('/clientes/:idCliente',auth, clienteController.eliminarCliente)
    

    
    router.post('/productos',auth, productosController.subirArchivo ,productosController.nuevoProducto)

    router.get('/productos',auth,productosController.mostrarProductos)

    router.get('/productos/:idProducto',auth,productosController.mostrarProducto)

    router.put('/productos/:idProducto',auth,productosController.subirArchivo , productosController.actualizarProducto)

    router.delete('/productos/:idProducto',auth,productosController.eliminarProducto)

    router.post('/productos/busqueda/:query',productosController.buscarProducto )

    router.post('/pedidos',auth,pedidosController.nuevoPedido)

    router.get('/pedidos',auth,pedidosController.mostrarPedidos)

    router.get('/pedidos/:idPedido',auth,pedidosController.mostrarPedido)

    router.put('/pedidos/:idPedido',auth,pedidosController.actualizarPedido)

    router.delete('/pedidos/:idPedido',pedidosController.eliminarPedido)


    router.post('/crear-cuenta',usuariosController.registrarUsuario
    )
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario)


    return router;
}