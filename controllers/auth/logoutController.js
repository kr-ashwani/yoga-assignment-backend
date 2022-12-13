module.exports = async function (req, res) {
  try {
    res.clearCookie('_auth_token', {
      httpOnly: true,
      maxAge: process.env.ACCESS_TOKEN_EXP_TIME,
      sameSite: 'lax',
    });
    res.status(200).json('user logged out successfully.');
  } catch (err) {
    console.log(err.message);
  }
};
