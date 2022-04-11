module.exports = class Carrito {
    static arrCarritos = []

    //devolver carritos 
    getCarritos() {
        return Carrito.arrCarritos.length === 0 ? null : Carrito.arrCarritos;
    }


    //devuelvo carrito por id
    getCarritoID(idC) {
        return idC != undefined && typeof(idC) === "number" ? Carrito.arrCarritos.find(carrito => carrito.id === idC) : null
    }

    //crea carrito y devuelve id
    createCarrito(obj) {
        let id = Carrito.arrCarritos.legth === 0 ? 0 : Carrito.arrCarritos.reduce((acum, proximo) => acum > proximo.id ? acum : proximo.id, 0);
        id++;
        let carritoNuevo = {
            id: id,
            productos: obj.productos,

        };
        Carrito.arrCarritos.push(carritoNuevo);
        return id;
    }

    //agrego un producto al carrito
    agregarProducto(idC, objprod) {
        if (objprod.idProd != undefined && idC != undefined) {
            let posicionCar = Carrito.arrCarritos.findIndex(c => c.id === idC);

            if (posicionCar > -1) {
                //chequeo si producto existe
                let pospro = Carrito.arrCarritos[posicionCar].productos.findIndex(p => p.idProd === objprod.idProd)
                if (pospro > -1) {
                    let cantprod = Carrito.arrCarritos[posicionCar].productos[pospro].cantidad;
                    Carrito.arrCarritos[posicionCar].productos[pospro].cantidad = cantprod + 1;

                } else {
                    Carrito.arrCarritos[posicionCar].productos.push({
                        id: objprod.idProd,
                        precio: objprod.precioProd,
                        cantidad: 1,
                    })
                }
                return true; //ok
            }

        }

        return false;
    }

    //eliminar producto del carrito

    eliminarProducto(idC, idProd) {
        if (idC != undefined && idProd != undefined) {
            let posicionCar = Carrito.arrCarritos.findIndex(c => c.id === idC);
            if (posicionCar > -1) {
                let posicionProd = Carrito.arrCarritos[posicionCar].productos.findIndex(p => p.idProd === idProd);

                if (posicionProd > -1) {
                    Carrito.arrCarritos[posicionCar].productos.splice(posicionProd, 1)
                    return true
                } else {
                    console.log('el producto no existe en el carrito')
                    return false;

                }
            }
            return false
        }
    }

    //eliminar carrito
    eliminarCarrito(idC) {
        if (idC != undefined && typeof(idC) === 'number') {
            let pos = Carrito.arrCarritos.findIndex(c => c.id === idC);
            if (pos > -1) {
                Carrito.arrCarritos.splice(pos, 1);
                return true;
            }
        }
        return false;
    }
}