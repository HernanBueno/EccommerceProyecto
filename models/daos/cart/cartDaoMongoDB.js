const ContenedorMongoDB = require('../../contenedores/contenedorMongoDB')
const mongoose = require('mongoose')

const collection = 'carritos'

const carritoSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    timestamp: { type: Date, min: Date.now() },
    productos: [{ type: Object, ref: 'productos' }]
})

class CarritoDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(collection, carritoSchema)
    }
}

module.exports = CarritoDaoMongoDB