const { Router } = require('express')
const router = Router()
const { getProductos, postProductos, getForm } = require('../controllers/controllers')

router.get('/productos', getProductos )

router.post('/productos', postProductos )

router.get('/', getForm )



module.exports = router