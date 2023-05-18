// import { route as productROuter } from "./products.routes";
// const productROuter = require('./products.routes')
import express, { json } from "express"
import routerProducts from "./products.routes.js"

const routerApi = (app) => {
    const versionRoutes = express.Router()

    versionRoutes.use('/products', routerProducts)
    // COMO ES VERCEL TENGO QUE PONERLE /api/
    app.use('/api/v1', versionRoutes)
    // app.use('/products', productROuter)
}
export default routerApi