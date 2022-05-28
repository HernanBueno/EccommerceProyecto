const { ProductosDao } = require('../models/daos/indexApi')
    //const ProductosDao = require('../models/daos/products/ProductosDaoMongoDB')

const productosApi = new ProductosDao()

const getAllProductos = async(req, res) => {
    const allProductos = await productosApi.getAll()
    return res.json(allProductos)
};
const getProductoById = async(req, res) => {
    const { productoId } = req.params
    const searchedProducto = await productosApi.getById(productoId)
    return res.json(searchedProducto);
};
const saveProducto = async(req, res) => {
    const idCount = await productosApi.getAll()
    const { name, desc, image, price, stock } = req.body;
    if (!name || !desc || !image || !price || !stock) return { error: 'Todos los campos son obligatorios!' };
    const newProduct = {
        id: idCount.length + 1,
        code: idCount.length + 1,
        timestamp: Date.now(),
        name,
        desc,
        image,
        price,
        stock
    };
    productosApi.save(newProducto)
    return res.json({ response: `Se agregó el nuevo Producto: ${newProducto.id}` })
};
const updateProducto = (req, res) => {
    const { productoId } = req.params
    const { name, desc, price, image, stock } = req.body
    const newProducto = { name, desc, price, image, stock }

    if (!name || !desc || !image || !price || !stock) return res.json({ error: 'Todos los campos son obligatorios!' });

    const updatedProducto = productosApi.updateById(productoId, newProducto)
    return res.json({ response: `Se actualizó el Producto: ${productoId}` })
}
const deleteProducto = (req, res) => {
    const { productoId } = req.params
    const deletedProducto = productosApi.deleteById(productoId)
    if (deletedProducto.error) return res.status(404).send(deletedProducto.error);
    return res.json({ response: `Se eliminó el Producto: ${productoId}` });
};

module.exports = {
    productosApi,
    getAllProductos,
    getProductoById,
    saveProducto,
    updateProducto,
    deleteProducto,
}