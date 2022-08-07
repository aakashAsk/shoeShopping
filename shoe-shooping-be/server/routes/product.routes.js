const express = require("express")
const router = express.Router()
const productController = require('../controllers/product.controller')

router.post('/addProduct', productController.addProduct)
router.get('/getAllProducts', productController.getAllProducts)
router.get('/getAllProductsUser', productController.getAllProductsUser)
router.get('/editProduct', productController.editProduct)
router.get('/deleteProduct', productController.deleteProduct)
router.post('/updateQuantity', productController.updateQuantity)
router.post('/searchProduct', productController.searchProduct)
router.get('/getProduct', productController.getProduct)



module.exports = router