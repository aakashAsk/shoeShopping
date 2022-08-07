const express = require("express")
const router = express.Router()
const reservationController = require('../controllers/reservation.controller')

router.post('/reserveProduct', reservationController.reserveProduct)
// router.post('/reserveProduct', 
router.get('/getAllReservationByUserId', reservationController.getAllReservationByUserId)
router.get('/getAllReservation', reservationController.getAllReservation)
router.get('/getAllReservationByUser', reservationController.getAllReservationByUser)
router.post('/deleteReservation', reservationController.deleteReservation)



module.exports = router