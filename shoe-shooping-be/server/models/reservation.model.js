const mongoose = require('mongoose')
require('../../mongo')

const ReservationSchema = new mongoose.Schema({
  productId:{
    type: mongoose.Types.ObjectId,
    ref: 'product'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    default:null
  },
  retailer:{
    type: mongoose.Types.ObjectId,
    ref: 'users',
    default:null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('reservation', ReservationSchema)
