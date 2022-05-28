const express = require('express')
const productosRouter = require('./products/productos.router')
const cartRouter = require('./cart/carrito.router')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.use('/productos', productosRouter)
router.use('/carrito', carritoRouter)

module.exports = router