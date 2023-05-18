import { faker } from '@faker-js/faker'
class ProductList {

    constructor() {
        this.products = [];
        this.generate();
    }

    generate(limit = 10) {
        this.products = [];
        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                aviable: faker.datatype.boolean(),
                price: faker.commerce.price(),
                image: faker.image.imageUrl()
            })
        }
    }

    getAllProducts() {
        return this.products
    }

    setProduct(productX) {
        try {
            this.products.push(productX)
            return productX
        } catch (e) {
            throw new Error('No se pudo adicionar producto')
        }
    }

    getProductX(idProduct) {
        const index = this.products.findIndex(productX => productX.id === idProduct)
        if (index != -1) {
            return this.products[index]
        } else {
            throw new Error('Producto no encontrado')
        }
    }

    deleteProduct(idProduct) {
        const index = this.products.findIndex(productX => productX.id === idProduct)
        if (index != -1) {
            this.products.splice(index, 1);
            return idProduct
        } else {
            throw new Error('Producto no encontrado')
        }
    }

    updateProduct(idProduct, productModified) {
        const index = this.products.findIndex(productX => productX.id === idProduct)
        if (index != -1) {
            this.products[index] = productModified;
            return productModified
        } else {
            throw new Error('Producto no encontrado')
        }
    }

}

export default ProductList