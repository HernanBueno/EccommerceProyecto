const express = require('express')
const app = express();

const routerProductos = require('./routes/productos')
const routerCarrito = require('./routes/carrito.js')

const validarRuta = (req, res, next) => {
    res.json({
        error: -2,
        descripción: `La ruta '${req.url}' método '${ req.method}' no existe`
    });
}


//habilitar routing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(validarRuta);

app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);
//server corriendo

const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.log("servidor corriendo");
});
