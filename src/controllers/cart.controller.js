const express = require('express');

const router = express.Router();

const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

const crudController = require('./crud.controller');

router.post('', crudController.post(Cart));
router.get('', crudController.get(Cart));
router.get('/:id', crudController.getOne(Cart));
router.patch('/:id', crudController.updateOne(Cart));
router.delete('/:id', crudController.deleteOne(Cart));

router.get('/final/:userId', async (req, res) => {
    try {

        const cart = await Cart.find({userId: req.params.userId}).lean().exec();
        const user = await User.findById(req.params.userId).lean().exec();

        return res.status(200).json({cart, user});

    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.patch('/update/:productId/:userId', async (req, res) => {
    try {

        const cart = await Cart.findOneAndUpdate({
            $and: [
                {userId: req.params.userId},
                {productId: req.params.productId}
            ]
        }).lean().exec();

        return res.status(200).json({cart});

    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.get('/check/:userId/:productId', async (req, res) => {
    try {

        const check = await Cart.findOne({$and: [{userId: req.params.userId}, {productId: req.params.productId}]}).lean().exec();


        return res.status(200).json({check});

    } catch (err) {
        return res.status(400).send(err.message);
    }
})

module.exports = router;