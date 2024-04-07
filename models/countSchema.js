const mongoose = require('mongoose');

const hitCountSchema = new mongoose.Schema({
    count: Number,
  });

  const HitCount = mongoose.model('HitCount', hitCountSchema);
  
  module.exports = HitCount;