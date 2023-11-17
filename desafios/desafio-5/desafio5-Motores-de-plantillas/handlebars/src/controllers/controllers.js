const productos = []

const getProductos = (req, res) => {
    res.render('productListContainer', { productos, render: productos.length !== 0 ? 1 : 0})
}

const postProductos = (req, res) => {
    const { title, price, thumbnail } = req.body
    const prod = { title, price, thumbnail }
    prod.id = (productos.length !== 0) ? productos[productos.length - 1].id + 1 : 1;
    productos.push(prod)
    res.redirect('/')
}

const getForm = (req, res) => {
    res.render('form')
}

module.exports = {
    getProductos,
    postProductos,
    getForm
}