const productos = []

const getProductos = (req, res) => {
    res.render('pages/productList', { productos })
}

const postProductos = (req, res) => {
    const { title, price, thumbnail } = req.body
    const prod = { title, price, thumbnail }
    prod.id = (productos.length !== 0) ? productos[productos.length - 1].id + 1 : 1;
    productos.push(prod)
    res.redirect('/')
}

const getForm = (req, res) => {
    res.render('pages/form')
}

module.exports = {
    getProductos,
    postProductos,
    getForm
}