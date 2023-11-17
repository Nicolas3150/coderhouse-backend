const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const { productDB, messageDB } = require('./public/js/configDB')


app.use(express.static(path.join(__dirname, './public')))

const expressServer = app.listen(8080, err => {
    err ? console.log(`Se produjo un error al iniciar el servidor ${err}`) :
        console.log(`El servidor esta escuchando el puerto ${8080}`);
})

const io = new IOServer(expressServer)

io.on('connection', async socket => {
    console.log(`Se conecto un usuario nuevo id:${socket.id}`)

    await productDB.createContainerTable()
    let products = await productDB.getAll()
    socket.emit('server:products', products)
    socket.on('product:product', async prod => {
        await productDB.save(prod)
        products = await productDB.getAll()
        io.emit('server:products', products)
    })

    await messageDB.createMessageTable()
    let messages = await messageDB.getMessages()
    socket.emit('server:message', messages)
    socket.on('client:message', async message => {
        await messageDB.saveMessage(message)
        messages = await messageDB.getMessages()
        io.emit('server:message', messages)
    })
})