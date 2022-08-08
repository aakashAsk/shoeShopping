const reservationModel = require('../models/reservation.model');
const productModel = require('../models/product.model');
const userModel = require('../models/auth.model');
const nodemailer = require('nodemailer');

exports.reserveProduct = async (req, res) => {
  console.log(req.body);
  try{
    const user = await userModel.findOne({ _id: req.body.userId })
    const retailer = await userModel.findOne({ _id: req.body.retailer })
    const admin = await userModel.findOne({ role: 'admin' })
    console.log(retailer, admin, user)
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
          let array = [{email:admin.email, text: ''}, {email:retailer.email, text:""}, {email:user.email, text:""}]
          let promise = []
          for(let i=0; i<=2; i++){
            promise.push(sendMail(array[i].email, array[i].text));
          }
          Promise.all(promise).then(result => {
            res.status(200).send({
              status: true,
              message: "Product Reserve Successfully"
            })
          })
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

function sendMail(mail, text){
  let promisesArray = [];
  promisesArray.push(new Promise((resolve, reject) => {
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
      to: mail,
      subject: 'Shoe reservation',
      text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        resolve()
      }
    });
    return promisesArray;
  }))
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



