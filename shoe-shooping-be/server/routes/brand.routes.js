const express = require("express")
const router = express.Router()
const productController = require('../controllers/product.controller')

router.post('/addBrand', productController.addProduct)
router.get('/getAllBrand', productController.getAllProducts)



module.exports = router