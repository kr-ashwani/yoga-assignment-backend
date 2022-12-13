const { v4: uuidv4 } = require('uuid');
const User = require('../../models/User');
const Order = require('../../models/Order');
const handleErrors = require('../utils/handleErrors');

const yogaEnrollController = async (req, res) => {
  if (!req.userInfo) return res.status(400).json('user need to login first');

  const { time, enrolled, amountPaid } = req.body;

  if (!(time && enrolled, amountPaid))
    res.status(400).json('time or enroll or amount paid missing');
  const orderInfo = await Order.create({
    orderID: uuidv4(),
    orderTitle: 'yoga classes enroll',
    orderAmount: amountPaid,
    orderTimeSlot: time,
    orderPlacedTime: Date.now(),
  });

  const orderDetail = await User.findOneAndUpdate(
    { email: req.userInfo.email },
    { $set: { enrolled: true, yogaEnrollId: orderInfo.orderID } }
  );

  res.status(200).json({
    user: {
      ...req.userInfo,
      enrolled: true,
      yogaEnrollId: orderInfo.orderID,
    },
    orderDetail,
  });
  try {
  } catch (err) {
    const message = handleErrors(err);
    return res.status(500).json(message);
  }
};

module.exports = yogaEnrollController;
