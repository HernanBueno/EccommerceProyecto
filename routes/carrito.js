const express = require("express");
const router = express.Router();
const Carrito = require("../modules/Carrito");
const Carrito1 = new Carrito();

//get de carritos
router.get('/', (req, res) => {
    res.status(200).json(Carrito1.getCarritos());
})

// get de carrito by id
router.get('/:idC/productos', (req, res) => {
    let idC = parseInt(req.params.idC);
    if (!isNaN(idC)) {
        let objProd = Carrito1.getCarritoID(idC);
        if (objProd != null) {
            res.status(200).json(objProd)
        } else { res.status(406).json({ error: 'No se encontro el carrito con ese id' }) }
    } else {
        res.status(404).json({ error: 'el id ingresado no es valido' })
    }
})

//post carritos
router.post('/', (req, res) => {
        let objProd = {...req.body };
        let objCarritoNuevo = Carrito1.createCarrito(objProd);
        if (objCarritoNuevo != null) {
            res.status(200).json(objCarritoNuevo)
        } else {
            res.status(406).json({ error: 'error al crear nuevo carrito' })
        }
    })
    //post productos a carrito
router.post('/:idC/productos', (req, res) => {
    let idC = parseInt(req.params.idC);
    let objProd = {...req.body };

    if (Carrito1.agregarProducto(idC, objProd)) {
        res.status(200).json({ status: 'el produicto se agrego correctamente' })
    } else {
        res.status(406).json({ error: 'No se encontro el carrito ' })
    }
})

//delete de producto en carritobyid
router.delete('/:idC/productos/:idProd', (req, res) => {
    let idC = parseInt(req.params.idC);
    let idProd = parseInt(req.params.idProd);
    if (Carrito1.eliminarProducto(idC, idProd)) {
        res.status(200).json({ status: 'el producto se elimino correctamente del carrito' })
    } else {
        res.status(406).json({ error: 'No se pudo eliminar el producto ' })
    }
})

//delete de carrito
router.delete('/:idC', (req, res) => {
    let idC = parseInt(req.params.idC);
    if (Carrito1.eliminarCarrito(idc)) {
        res.status(200).json({ status: 'elcarrito se elimino correctamente' })
    } else {
        res.status(406).json({ error: 'No se pudo eliminar el carrito ' })
    }
})

module.exports = router;