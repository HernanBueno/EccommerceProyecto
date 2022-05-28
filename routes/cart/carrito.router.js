const express = require('express')
const { adminChecker } = require('../../middleware/adminChecker')

const {
    postNuevoCarrito,
    deleteCarrito,
    getCarritoProductos,
    postNuevoProducto,
    deleteProductoCarrito
} = require('../../controllers/carrito.controller')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/', adminChecker, postNuevoCarrito)
router.delete('/:carritoId', adminChecker, deleteCarrito)
router.get('/:carritoId', adminChecker, getCarritoProductos)
router.post('/:carritoId/productos/:productoId', adminChecker, postNuevoProducto)
router.delete('/:carritoId/productos/:productoId', adminChecker, deleteProductoCarrito)

module.exports = router