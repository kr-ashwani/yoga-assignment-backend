const handleErrors = require('../utils/handleErrors');

async function refreshController(req, res) {
  const { userInfo } = req;
  console.log(req.userInfo);
  try {
    res.status(200).json({ currentUser: userInfo });
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json(message);
  }
}

module.exports = refreshController;
