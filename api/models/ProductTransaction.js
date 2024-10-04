const mongoose = require('mongoose');

const productTransactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dateOfSale: {
    type: Date,
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
  },
});

productTransactionSchema.index({ title: 'text', description: 'text', price: 1 });
productTransactionSchema.index({ dateOfSale: 1 });

module.exports = mongoose.model('ProductTransaction', productTransactionSchema);
