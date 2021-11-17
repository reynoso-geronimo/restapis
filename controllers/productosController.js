const Productos = require("../models/Productos");
const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no Valido"));
    }
  },
};
const upload = multer(configuracionMulter).single("imagen");

exports.subirArchivo = async (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }

    return next();
  });
};

exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);

  try {
    if (req.file) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Se Agrego el producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({});
    res.json(productos);
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.mostrarProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto);

  if (!producto) {
    res.json({ mensaje: "No Encontrado" });
    return next();
  }
  res.json(producto);
};
exports.actualizarProducto = async (req, res, next) => {
  try {
    let nuevoProducto = req.body;

    if (req.file) {


        const producto = await Productos.findById(req.params.idProducto);

        if (producto.imagen) {
          const imagen = __dirname + `/../uploads/${producto.imagen}`;
    
          //eliminar archivo con fs
          fs.unlink(imagen, (error) => {
            if (error) {
              console.log(error);
            }
            return;
          });
        }


      nuevoProducto.imagen = req.file.filename;
    } else {
      let productoAnterior = await Productos.findById(req.params.idProducto);
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    let producto = await Productos.findOneAndUpdate( { _id: req.params.idProducto },nuevoProducto,{new: true,});
    res.json({mensaje:'Producto Actualizado'});
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.eliminarProducto = async (req, res, next) => {
  try {
    const producto = await Productos.findById(req.params.idProducto);

    if (producto.imagen) {
      const imagen = __dirname + `/../uploads/${producto.imagen}`;

      //eliminar archivo con fs
      fs.unlink(imagen, (error) => {
        if (error) {
          console.log(error);
        }
        return;
      });
    }

    await Productos.findOneAndDelete({ _id: req.params.idProducto });

    res.json({ mensaje: "Producto Eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.buscarProducto=async (req,res,next)=>{
  try {
    const {query} = req.params
    console.log(query)
    const producto = await Productos.find({nombre: new RegExp(query,'i')});
    res.json(producto)
  } catch (error) {
    console.log(error)
    next
  }
}