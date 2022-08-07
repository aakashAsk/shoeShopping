const express = require("express")
const router = express.Router()
const autController = require('../controllers/auth.controller')

router.post('/signup', autController.signup)

router.post('/signin', autController.signin)
router.get('/getAllUsersAdmin', autController.getAllUsersAdmin)
router.post('/approveOrRejectRetailer', autController.approveOrRejectRetailer)


module.exports = router