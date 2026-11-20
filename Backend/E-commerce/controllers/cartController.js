const {sendResponse} = require('../utils/response')

const getCartForUser = (req, res) => {
  const userId = req.params.userId;

  sendResponse(res, `Fetching cart for user with ID: ${userId}`, 200);
};

const addProductToCart = (req, res) => {
  const userId = req.params.userId;

  sendResponse(res, `Adding product to cart for user with ID: ${userId}`, 200);
};

module.exports = {
  getCartForUser,
  addProductToCart,
};
