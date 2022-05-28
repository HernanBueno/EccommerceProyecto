

let ProductosDao;
let CarritosDao;

switch (PERS || 'mongo') {
    case 'mongo':
        ProductosDao = require('./products/ProductosDaoMongoDB');
        CarritosDao = require('./cart/CarritosDaoMongoDB');
        break;
    case 'file':
        break;
    case 'memory':
        break;
    default:
        throw new Error('Metodo invalido');
}

module.exports = {
    ProductosDao,
    CarritosDao,
}