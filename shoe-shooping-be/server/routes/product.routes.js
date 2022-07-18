const express = require("express")
const router = express.Router()
const productController = require('../controllers/product.controller')

router.post('/addProduct', productController.addProduct)
router.get('/getAllProducts', productController.getAllProducts)



module.exports = router