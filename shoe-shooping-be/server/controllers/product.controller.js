const productModel = require('../models/product.model');

exports.addProduct = (req, res) => {
  try{
    console.log(req.body)
    let ProductId = `PRD${Math.floor((Math.random() * 100000) + 1)}`
    new productModel({
      ...req.body,ProductId
    })
    .save()
    .then(result => {
      res.status(200).send({
        status: true,
        message: "Product added successfully"
      })
    })
  }
  catch(err){
  }
}

exports.getAllProducts = (req, res) => {
  try {
    productModel.find({retailer: req.query.userid})
    .then(result => {
      res.status(200).send({
        status: true,
        message: "All Product fetch successfully",
        result: result
      })
    })
  }
  catch (err) {
  }
}

exports.getAllProductsUser = (req, res) => {
  // try {
    if (req.query.title){
      productModel.findOne({ title: req.query.title })
        .then(result => {
          res.status(200).send({
            status: true,
            message: "",
            result: [result]
          })
        })
    }
    else{
      productModel.find()
      .then(result => {
        res.status(200).send({
          status: true,
          message: "All Product fetch successfully",
          result: result
        })
      })
    }

  // }
  // catch (err) {
  // }
}

exports.editProduct = (req, res) => {
  try{
    console.log(req.body)
    
    productModel.findOneAndUpdate({
      ...req.body
    })
    .save()
    .then(result => {
      res.status(200).send({
        status: true,
        message: "Product successfully updated"
      })
    })
  }
  catch(err){
  }
}

exports.deleteProduct = (req, res) => {
  try{
    productModel.findOneAndDelete({_id: req.query.id})
    .then(result => {
      res.status(200).send({
        status: true,
        message: "Product successfully updated"
      })
    })
  }
  catch(err){
    res.status(200).send({
      status: false,
      message: "Something wen wrong please try again later"
    })
  }
}

exports.updateQuantity = async (req, res) => {
  try{
    productModel.findOneAndUpdate({_id: req.body.productId}, {quantity: req.body.quantity})
    .then(result => {
      res.status(200).send({
        status: true,
        message: "Product quamtity update successfully",
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

exports.searchProduct = (req, res) => {
  try{
    productModel.find({ title: { $regex: `${req.query.search}`, $options: '$i' } })
    .then(result => {
      res.status(200).send({
        status: true,
        message: "Search result",
        result
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
exports.getProduct = (req, res) => {
  try {
    
  }
  catch (err) {
    res.status(200).send({
      status: false,
      message: "Something went wrong",
    })
  }
}