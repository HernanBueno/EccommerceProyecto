module.exports = class producto {
    static contenedorProductos = [];

    getMaxId() {
        return producto.contenedorProductos.length === 0 ?
            0 :
            producto.contenedorProductos.reduce(
                (acum, proximo) => (acum > proximo.id ? acum : proximo.id),
                0
            );
    }

    getProductos() {
        return producto.contenedorProductos.length === 0 ?
            null :
            producto.contenedorProductos;
    }

    getProductoById(idP) {
        return idP != undefined && typeof idP === "number" ?
            producto.contenedorProductos.find((producto) => producto.id === idP) :
            null;
    }

    setProducto(objP) {
        if (
            objP.title != undefined &&
            objP.description != undefined &&
            objP.code != undefined && parseInt(objP.code) != NaN &&
            objP.stock != undefined && parseInt(objP.stock) != NaN &&
            objP.price != undefined &&
            parseInt(objP.price) != NaN &&
            objP.thumbnail != undefined &&
            objP.thumbnail != ""
        ) {
            let id = this.getMaxId();
            id++;
            objP.id = id;

            let objPAgregado = {
                id: objP.id,
                title: objP.title,
                description: objP.description,
                code: objP.code,
                thumbnail: objP.thumbnail,
                price: objP.price,
                stock: objP.stock,

            };
            producto.contenedorProductos.push(objPAgregado);
            return objPAgregado;
        } else {
            return null;
        }
    }

    updateProducto(idP, objP) {
        if (
            objP.title != undefined &&
            objP.description != undefined &&
            parseInt(objP.code) != NaN &&
            parseInt(objP.stock) != NaN &&
            objP.thumbnail != undefined &&
            objP.thumbnail != "" &&
            objP.price != undefined &&
            parseInt(objP.price) != NaN &&
            idP != undefined &&
            typeof idP === "number"
        ) {
            let posicion = producto.contenedorProductos.findIndex(
                (producto) => producto.id === idP
            );
            if (posicion > -1) {
                producto.contenedorProductos.splice(posicion, 1);

                producto.contenedorProductos.push({
                    id: objP.id,
                    title: objP.title,
                    description: objP.description,
                    code: objP.code,
                    stock: objP.stock,
                    price: objP.price,
                    thumbnail: objP.thumbnail,
                });
                return true;
            }
        }
        return false;
    }

    deleteProducto(idP) {
        if (idP != undefined && typeof idP === "number") {
            let posicion = producto.contenedorProductos.findIndex(
                (element) => element.id === idP
            );

            if (posicion > -1) {
                producto.contenedorProductos.splice(posicion, 1);
                return true;
            }
        }
        return false;
    }
};