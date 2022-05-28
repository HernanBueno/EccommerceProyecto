const express = require('express')
const { adminChecker } = require('../../middleware/adminChecker')

const {
    getAllProductos,
    getProductoById,
    saveProducto,
    updateProducto,
    deleteProducto,
} = require('../../controllers/productos.controller')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', getAllProductos)

router.get('/:productoId', adminChecker, getProductoById)

router.post('/', adminChecker, saveProducto)

router.put('/:productoId', adminChecker, updateProducto)

router.delete('/:productoId', adminChecker, deleteProducto)

module.exports = router;