const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')

const Contenedor = require('./public/js/contenedor')
let newContenedor = new Contenedor()

const products = [{
    title: "Regla",
    price: 475,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}]

app.use(express.static(path.join(__dirname, './public')))

const expressServer = app.listen(8080, err => {
    err ? console.log(`Se produjo un error al iniciar el servidor ${err}`) :
        console.log(`El servidor esta escuchando el puerto ${8080}`);
})

const io = new IOServer(expressServer)

io.on('connection', async socket => {
    console.log(`Se conecto un usuario nuevo id:${socket.id}`)

    socket.emit('server:products', products)
    socket.on('product:product', prod =>{
        prod.id = (products.length !== 0) ? products[products.length - 1].id + 1 : 1;
        products.push(prod)
        io.emit('server:products', products)
    })

    socket.emit('server:message', await newContenedor.getMessages())
    socket.on('client:message', async message => {
        await newContenedor.save(message)
        io.emit('server:message', await newContenedor.getMessages())
    })
})