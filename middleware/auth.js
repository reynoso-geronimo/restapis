const jwt = require ('jsonwebtoken')

module.exports=(req,res,next)=>{
    //autorizacion por header
    const authHeader= req.get('Authorization')
    if(!authHeader){
        const error = new Error('No Autenticado');
        error.statusCode=401;
        throw error;;
    }
    const token = authHeader.split(' ')[1]
    let revisarToken;
    try {
        revisarToken= jwt.verify(token, 'KAMESENNIN')
    } catch (error) {
        error.status=500
        throw error
    }

    if(!revisarToken){
        const error =new Error('No autenticado');
        error.statusCode=401
        throw error;
    }
    next()
}