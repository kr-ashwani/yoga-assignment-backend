const bcrypt = require('bcrypt');
const crypto = require('crypto');
const handleErrors = require('../utils/handleErrors');
const User = require('../../models/User');
const { createAccessToken } = require('../utils/newJwtToken');

module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password))
      return res.status(400).json('name, email or password is missing ');

    if (password.length < 6)
      return res
        .status(403)
        .json('password should contain atleast 6 characters.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUser = await User.findOne({ email }).exec();
    if (checkUser)
      return res
        .status(400)
        .json('you have an existing account.Try logging in.');

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const payloadData = {
      name,
      email,
    };
    const accessToken = createAccessToken(payloadData);

    console.log(accessToken);

    res.cookie('_auth_token', accessToken, {
      httpOnly: true,
      maxAge: process.env.ACCESS_TOKEN_EXP_TIME,
      sameSite: 'lax',
    });

    res.status(200).json({ currentUser: { name, email } });
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json(message);
  }
};
