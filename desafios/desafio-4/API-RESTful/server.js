const express = require('express')
const app = express()
const port = 8080
const rutas = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))

app.use('/api/productos', rutas)

app.listen(port, err => {
    err ? console.log(`Se produjo un error al iniciar el servidor ${ err }`) :
        console.log(`El servidor esta escuchando el puerto ${port}`);
})