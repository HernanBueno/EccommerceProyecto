const Contenedor = require('../../contenedores/contenedorFileSystem.js')
const path = require('path')

const dataPath = path.resolve(__dirname, "./data.txt")
const contenedor = new Contenedor(dataPath)

class ProductosApi {
    constructor() {
        this.productos = (contenedor.data).then((res) => { this.productos = res })
    }
    getAll() {
        return this.productos;
    };

    getById(id) {
        const producto = this.productos.find(prod => prod.id === +id);
        return producto || { error: `el producto ${id} no fué encontrado!` };
    };

    saveNew(producto) {
        let idCount = [...this.productos].length
        const { name, desc, image, price } = producto;
        if (!name || !desc || !image || !price) return { error: 'Todos los campos son obligatorios!' };
        const newProducto = {
            id: idCount + 1,
            code: idCount + 1,
            timestamp: Date.now(),
            ...producto
        };
        contenedor.writeFile(newProducto)

        return newProducto;
    };

    async updateById(newInfo, id) {
        const newList = [...this.productos]
        const index = this.productos.findIndex(producto => producto.id === +id);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${id}!` };
        newList[index] = {
            id: +id,
            code: +id,
            timestamp: Date.now(),
            ...newInfo
        };

        await contenedor.writeAllFile(newList)

        this.productos = (contenedor.data).then((res) => { this.productos = res })

        return newList[index]
    };
    deleteById(id) {
        const index = this.productos.findIndex(producto => producto.id === +id);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${id}!` };
        const newList = this.productos.splice(index, 1)
        contenedor.writeAllFile(newList)
        return newList
    };
}

module.exports = ProductosApi;