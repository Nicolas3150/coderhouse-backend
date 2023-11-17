const express = require('express')
const app = express()
const rutas = require('./routes')
const { engine } = require('express-handlebars')
const path = require('path')

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layouts/main'),
    layoutsDir: path.join(__dirname, './views/layouts'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'./views'))

app.use(express.static(path.join(__dirname, '../public')))

app.use('/', rutas)

app.listen(8080, err => {
    err ? console.log(`Se produjo un error al iniciar el servidor ${ err }`) :
        console.log(`El servidor esta escuchando el puerto ${8080}`);
})
