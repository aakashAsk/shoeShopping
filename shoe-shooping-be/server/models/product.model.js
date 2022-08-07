const mongoose = require('mongoose')
require('../../mongo')

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price:{
    type: Number
  },
  disPrice:{
    type: Number
  },
  mall:{
    type: String
  },
  brand:{
    type: String
  },
  quantity:{
    type: Number
  },
  retailer:{
    type: mongoose.Types.ObjectId,
    ref:'users',
    default:null
  },
  sku:{
    type:String
  },
  ProductId:{
    type:String
  },
  color:{
    type:String
  },
  size:{
    type:Number
  },
  image:{type:String}
}, {
  timestamps: true
});

module.exports = mongoose.model('product', ProductSchema)
