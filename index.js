const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
const PORT = 3000
const { SALES_API_URL, PRODUCTS_API_URL } = require('./URLs')

const salesServiceProxy = httpProxy(SALES_API_URL)
const productsServiceProxy = httpProxy(PRODUCTS_API_URL)

app.get('/', (req, res) => res.send('Hello Gateway API'))

app.get('/sales', (req, res, next) => salesServiceProxy(req, res, next))
app.get('/sales/:id', (req, res, next) => salesServiceProxy(req, res, next))
app.post('/sales', (req, res, next) => salesServiceProxy(req, res, next))
app.delete('/sales/:id', (req, res, next) => salesServiceProxy(req, res, next))
app.get('/products', (req, res, next) => productsServiceProxy(req, res, next))
app.post('/products', (req, res, next) => productsServiceProxy(req, res, next))
app.put('/products/:id', (req, res, next) => productsServiceProxy(req, res, next))
app.delete('/products/:id', (req, res, next) => productsServiceProxy(req, res, next))

app.listen(PORT, () =>{
    console.log(`API gateway listening on port ${PORT}`)
})
