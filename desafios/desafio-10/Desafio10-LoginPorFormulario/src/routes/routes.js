import { Router } from "express";
const router = Router();
import ProductContainer from '../public/js/productContainer.js'

const apiMock = new ProductContainer

router.get('/productos-test', async(req, res) => {
    try{
        apiMock.createProducts(5)
        const response = await apiMock.getAll()
        res.json(response).status(201)
    }catch(err){
        res.json({ error: true, message: err });
    }
})

export default router;