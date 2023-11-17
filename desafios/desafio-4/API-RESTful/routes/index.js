const { Router } = require('express')
const router = Router()
let productos = []

router.get('/', (req, res) => {
    res.json(productos)
})

router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.json({ error: "El parámetro no es un número" })
    }
    const productFilter = productos.filter(product => {
        return product.id === id
    })
    if (!productFilter.length) return res.status(404).json({error: "Producto no encontrado"})
    res.json(productFilter)
})

router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body
    const prod = { title, price, thumbnail }
    prod.id = (productos.length !== 0) ? productos[productos.length - 1].id + 1 : 1;
    productos.push(prod)
    res.status(201).json(prod)
})

router.put('/:id', (req, res) => {
    const { title, price, thumbnail } = req.body
    productos.forEach(prod => {
        if(prod.id === Number(req.params.id)){
            prod.title = title
            prod.price = price
            prod.thumbnail = thumbnail
        }
    })
    res.sendStatus(200)
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    productos = productos.filter(prod => prod.id !== id)
    res.sendStatus(200)
})

module.exports = router