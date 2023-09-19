// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartsController');
const verifyToken = require('../middlewares/verifyToken'); 
router.get('/',verifyToken, cartController.getCart);
router.delete('/delete-cart',verifyToken, cartController.deleteCart)
router.put('/add-to-cart', verifyToken, cartController.addToCart);
module.exports = router
