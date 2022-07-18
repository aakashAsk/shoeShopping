const productModel = require('../models/product.model');

exports.addProduct = (req, res) => {
  try{
    new productModel({
      ...req.body
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
    console.log(err)
  }
}

exports.getAllProducts = (req, res) => {
  try {
    productModel.find()
    .then(result => {
      res.status(200).send({
        status: true,
        message: "All Product fetch successfully",
        result: result
      })
    })
  }
  catch (err) {
    console.log(err)
  }
}