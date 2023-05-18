import express from 'express'
import routerApi from './routes/index.js';
import { globalErrorHandler, handleBoomError } from './middlewares/errors.handler.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

routerApi(app)

const whiteList = ['http://localhost:1234/', 'http://192.168.1.2']
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.get('/api/', (req, resp) => {
    resp.send('WELCOME TO THE CRUD PRODUCTS IN EXPRESS...')
})

app.use(cors(corsOptions))

app.use(globalErrorHandler)
app.use(handleBoomError)

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})