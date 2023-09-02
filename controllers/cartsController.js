const Cart = require('../models/Carts');
const mongoose = require('mongoose');



class CartsController {
    // api/carts (get all carts)
    getCart = async (req, res) => {
        try {
            const { userId } = req.query;
            const cart = await Cart.findOne({ uId: userId }).populate('_cartItems.itemId');

            if (!cart) {
                return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho user ID này.' });
            }
            res.json(cart);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin giỏ hàng.' });
        }
    };



    // api/cart/:slug/add-to-cart
    // VD: api/carts/64b6413d850413a49cf46648/add-to-cart
    addToCart = async (req, res, next) => {
        await Cart.init()
        try {
            const cart = await Cart.findOneAndUpdate({ uId: req.params.slug, "_cartItems.itemId": { $ne: req.body.itemId } }, {
                $addToSet: {
                    _cartItems: req.body
                },
            },
                { new: true }
            )
            if (cart) {
                await cart.save()
                res.status(200).json(
                    {
                        message: 'Success',
                        data: {
                            updatedCart: cart
                        }
                    }
                )
            } else {
                res.json({
                    message: 'Item already existed or maybe cart was not found',
                })
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error adding item to cart', error: error.message });
        }
    }

}

module.exports = new CartsController();
