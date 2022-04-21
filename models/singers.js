const mongoose = require('mongoose')

const singerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  part: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Singer', singerSchema)