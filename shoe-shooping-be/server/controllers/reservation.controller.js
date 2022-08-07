const reservationModel = require('../models/reservation.model');
const productModel = require('../models/product.model');
const userModel = require('../models/auth.model');
const nodemailer = require('nodemailer');

exports.reserveProduct = async (req, res) => {
  console.log(req.body);
  try{
    const user = await userModel.findOne({ _id: req.body.userId })
    const checkQuantity = await productModel.findOne({
      _id: req.body.productId
    })
    if(checkQuantity.quantity === 0){
      res.status(200).send({
        status: false,
        message: "Product is out of stock"
      })
    }
    else{
      let check = await reservationModel.findOne({
        productId: req.body.productId,
        userId: req.body.userId
      })
      
      if(!check){
        new reservationModel({
          ...req.body
        })
        .save()
        .then(result => {
  
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
              user: 'shoeShopping1997@gmail.com',
              pass: 'bdquhnflotwexszv'
            }
          });
          
          var mailOptions = {
            from: 'shoeShopping1997@gmail.com',
            to: user.email,
            subject: 'Shoe reservation',
            text: 'Wow, your shoe reservation is completed'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              res.status(200).send({
                status: true,
                message: "Product reserve successfully"
              })
            }
          });
        })
      }
      else{
        res.status(200).send({
          status: false,
          message: "You reserve product already"
        })
      }
    }
  }
  catch(err){
    res.status(200).send({
      status: false,
      message: "Something went wrong"
    })
  }
}

exports.getAllReservationByUserId = async (req, res) => {
  try{
    reservationModel.find({retailer: req.query.retailer})
    .populate('productId userId')
    .then(result => {
      res.status(200).send({
        status: true,
        message: "Product reserve successfully",
        result: result
      })
    })
  }
  catch(err){
    res.status(200).send({
      status: false,
      message: "Something went wrong",
    })
  }
}

exports.getAllReservation = async (req, res) => {
  try {
    reservationModel.find()
      .populate('productId userId')
      .then(result => {
        res.status(200).send({
          status: true,
          message: "Fetch all request",
          result: result
        })
      })
  }
  catch (err) {
    res.status(200).send({
      status: false,
      message: "Something went wrong",
    })
  }
}

exports.getAllReservationByUser = async (req, res) => {
  try{
    reservationModel.find({userId: req.query.userId})
    .populate('productId userId')
    .then(result => {
      res.status(200).send({
        status: true,
        message: "Product reserve successfully",
        result: result
      })
    })
  }
  catch(err){
    res.status(200).send({
      status: false,
      message: "Something went wrong",
    })
  }
}

exports.deleteReservation = (req, res) => {
  try{
    reservationModel.findOneAndDelete({_id: req.body.id})
    .then(result => {
      res.status(200).send({
        status: true,
        message: "Product reservation delete successfully",
      })
    })
  }
  catch(err){
    res.status(200).send({
      status: true,
      message: "Something went wrong",
    })
  }
}



