import express from 'express'
const app = express()
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import MessageContainer from './public/js/messageContainer.js';


import router from './routes/routes.js'
import { Server } from 'socket.io'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, './public')))
app.use('/api', router)
app.use((req, res) => {
    res.status(400).json({ error: -2, descripcion: "Ruta no implementada" })
})

const expressServer = app.listen(8080, err => {
    err ? console.log(`Se produjo un error al iniciar el servidor ${err}`) :
        console.log(`El servidor esta escuchando el puerto ${8080}`);
})

const io = new Server(expressServer)

io.on('connection', async socket => {
    console.log(`Se conecto un usuario nuevo id:${socket.id}`)

    fetch('http://localhost:8080/api/productos-test', { method: 'GET' })
        .then(response => response.json())
        .then(products => socket.emit('server:products', products))
        .catch((err) => {
            console.log('error al pegar a la api')
        })

    const messageDB = new MessageContainer()

    let messages = await messageDB.getMessages()
    socket.emit('server:message', messages)
    socket.on('client:message', async message => {
        await messageDB.saveMessage(message)
        messages = await messageDB.getMessages()
        io.emit('server:message', messages)
    })

})
