const express = require('express')
const app = express()
const rutas = require('./routes')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '../public')))

app.use('/', rutas)

app.listen(8080, err => {
    err ? console.log(`Se produjo un error al iniciar el servidor ${ err }`) :
        console.log(`El servidor esta escuchando el puerto ${8080}`);
})