const express = require('express')
const app = express()
const port = 8080

function getRandom(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


const Contenedor = require("./contenedor.js");
let newContenedor = new Contenedor("./productos.txt");

app.get('/', (req, res) => {
    res.send('<h1>Desafio 3 - Servidor con express</h1>')
})

app.get('/productos', async (req, res) => {
    const items = await newContenedor.getAll()
    res.send(items)
})

app.get('/productoRandom', async (req, res) => {
    const items = await newContenedor.getAll()
    const item = await newContenedor.getById(getRandom(1, items.length))
    res.send(item)
})

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`)
})