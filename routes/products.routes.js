import express from 'express'
import ProductList from '../services/products.services.js';
import boom from '@hapi/boom'
import { handleValidation } from '../middlewares/validation.middleware.js';
import { validateAddProductScheme, validateIdProductScheme, validateUpdateProductScheme } from '../schemaValidation/validation.schema.js';



const routerProducts = express.Router();
const productsList = new ProductList()
productsList.generate(5)






routerProducts.get('/', (req, resp) => {
    try {
        const listProducts = productsList.getAllProducts(20)
        resp.json({
            listProducts
        })
    } catch (error) {
        throw boom.badRequest('Error obteniendo productos')
    }
})

routerProducts.get('/products/:id',
    handleValidation(validateIdProductScheme, 'params'),
    (req, resp, next) => {
        try {
            const { id } = req.params
            const productX = productsList.getProductX(id)
            resp.json({
                productX
            })
        } catch (error) {
            throw boom.notFound('Producto no encontrado')
        }

    })

routerProducts.post('/',
    handleValidation(validateAddProductScheme, 'body'),
    (req, resp, next) => {
        try {

            const body = req.body
            const newProduct = productsList.setProduct(body)
            resp.json({
                status: 'created',
                data: newProduct
            })

        } catch (error) {
            throw boom.badRequest('Imposible agregar este producto')
        }

    })


routerProducts.delete('/:id',
    handleValidation(validateIdProductScheme, 'params'),
    (req, resp, next) => {
        try {

            const { id } = req.params
            const deletedProduct = productsList.deleteProduct(id)
            resp.json({
                status: 'deleted',
                data: deletedProduct
            })

        } catch (error) {
            throw boom.notFound('Elemento no encontrado')
        }

    })

routerProducts.put('/:id',
    handleValidation(validateIdProductScheme, 'params'),
    handleValidation(validateAddProductScheme, 'body'),
    (req, resp, next) => {
        try {

            const { id } = req.params
            const newProductModified = req.body
            const modifiedProduct = productsList.updateProduct(id, { id, ...newProductModified })
            resp.json({
                status: 'modified',
                modified: modifiedProduct
            })
        } catch (error) {
            throw boom.badRequest('Error acualizando producto')
        }
    })

routerProducts.patch('/:id',
    handleValidation(validateIdProductScheme, 'params'),
    handleValidation(validateUpdateProductScheme, 'body'),

    (req, resp, next) => {
        try {
            const { id } = req.params
            const newProductModified = req.body
            const productX = productsList.getProductX(id)
            const modifiedProduct = productsList.updateProduct(id, { ...productX, ...newProductModified })
            resp.json({
                status: 'modified',
                modified: modifiedProduct
            })
        } catch (error) {
            throw boom.badRequest('Error acualizando producto')
        }
    })

export default routerProducts