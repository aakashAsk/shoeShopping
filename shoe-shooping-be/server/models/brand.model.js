const mongoose = require('mongoose')
require('../../mongo')

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  
}, {
  timestamps: true
});

module.exports = mongoose.model('product', ProductSchema)
