const Contenedor = require('../../contenedores/contenedorFileSystem.js')
const path = require('path')

const dataPath = path.resolve(__dirname, "./carritos.txt")
const contenedor = new Contenedor(dataPath)

class CarritosApi {
    constructor() {
        this.carritos = (contenedor.data).then((res) => { this.carritos = res })
    }
    static idCount = 0

    async createCarrito() {
        const newCarrito = {
            id: ++CarritosApi.idCount,
            timestamp: Date.now(),
            products: [],
        }
        contenedor.writeFile(newCarrito)

        return { NewCarrito: `Tu nuevo Carro es el ${newCarrito.id}` }
    }
    async clearDelete(idCarrito) {
        const carritos = await this.carritos

        const index = carritos.findIndex(carr => carr.id === +idCarrito)
        if (index < 0) return { error: `No se encontró el Carrito con el id: ${idCarrito}!` };
        const elCarrito = carritos.find(carr => carr.id === +idCarrito)
        elCarrito.products = []

        carritos.splice(index, 1)

        contenedor.writeAllFile(carritos)

        return { success: `${elCarrito.id} fué eliminado.` }
    }
    showItems(idCarrito) {
        const elCarrito = this.carritos.find(carr => carr.id === +idCarrito)

        return { Productos: elCarrito.products }
    }
    async saveItem(idCarrito, producto) {
        const carritos = await this.carritos
        const index = carritos.findIndex(carr => carr.id === +idCarrito)
        carritos[index].productos.push(producto)
        contenedor.writeAllFile(carritos)
        return { message: `${producto.name} a sido añadido al Cart` }
    }
    async deleteItem(idCarrito, idProducto) {
        const carritos = await this.carritos
        const elCarrito = carritos.find(carr => carr.id === +idCarrito)
        const productosActuales = elCarrito.productos
        const index = productosActuales.findIndex(prod => prod.id === +idProducto);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${idProducto}!` };
        const nombreProducto = productosActuales[index].name
        productosActuales.splice(index, 1)
        contenedor.writeAllFile(carritos)
        return { Success: `El producto: ${nombreProducto} fué eliminado de la lista` }
    }
}

module.exports = CarritosApi