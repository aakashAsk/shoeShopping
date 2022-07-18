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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('product', ProductSchema)
