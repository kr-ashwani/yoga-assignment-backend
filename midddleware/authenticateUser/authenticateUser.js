const jwt = require('jsonwebtoken');
const handleErrors = require('../../controllers/utils/handleErrors');
const Order = require('../../models/Order');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const { _auth_token } = req.cookies;
    if (!_auth_token) return next();

    console.log(_auth_token);
    jwt.verify(
      _auth_token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (err, payload) => {
        if (err) return res.status(403).json('cookie experied or tampered.');
        let user = await User.findOne(
          { email: payload.email },
          {
            password: 0,
            __v: 0,
          }
        ).exec();
        if (user.enrolled) {
          const order = await Order.findOne({
            orderID: user.yogaEnrollId,
          }).exec();
          user = { ...order.toObject(), ...user.toObject() };
        }
        if (!user) return res.status(403).json('user is not registered.');
        req.userInfo = user;
        next();
      }
    );
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};
