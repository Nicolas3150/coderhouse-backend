import { faker } from "@faker-js/faker"
faker.locale = 'es'

class ProductContainer {
    constructor() {
        this.data = []
    }

    createProducts(cantidad) {
        this.deleteAll()
        for (let i = 0; i < cantidad; i++) {
            this.data.push({
                id: i,
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                thumbnail: faker.image.image(640,480,true)
            })
        }
    }

    async getAll(){
        return this.data
    }

    deleteAll(){
        this.data = []
    }
}

export default ProductContainer