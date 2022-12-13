const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastLoginAt',
  },
};

const OrderSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      required: [true, 'enter orderID'],
    },
    orderTitle: {
      type: String,
      required: [true, 'enter order title'],
    },
    orderAmount: {
      type: Number,
      required: [true, 'enter amount'],
    },
    orderTimeSlot: {
      type: String,
      required: [true, 'enter time slot'],
    },
    orderPlacedTime: {
      type: Number,
      required: [true, 'ordet placed time is required'],
    },
  },
  schemaOptions
);

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
