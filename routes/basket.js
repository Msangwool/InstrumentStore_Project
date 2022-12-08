const express = require('express');
const { redirect } = require('express/lib/response');
const { Instrument, Basket } = require('../models');
const { isLoggedIn } = require('./helpers');

const router = express.Router();

// http://localhost:3000/basket
router.route('/')
    .get(isLoggedIn, async (req, res, next) => {

        const baskets = await Basket.findAll({
            where: { userId: req.user.id }
        });
        if (baskets) {
            res.json(baskets);
        }
        else { res.json({ 'success': '장바구니가 존재하지 않습니다.' }) }

    });


// http://localhost:3000/basket/create
router.post('/create', isLoggedIn, async (req, res, next) => {
    const { instrumentId, count } = req.body;
    const basket = await Basket.findOne({
        where: {
            instrumentId: instrumentId,
            userId: req.user.id
        }
    })

    if (basket) {
        const sum = parseInt(basket.count) + parseInt(count);
        const result = await Basket.update(
            { count: sum },
            {
                where: {
                    basketId: basket.basketId,
                }
            });
        if (result) {
            res.write("<script>alert('update complete')</script>");
            res.write(`<script>window.location=\"${link}\"</script>`);
        } else {
            res.write("<script>alert('update fail')</script>");
            res.write(`<script>window.location=\"${link}\"</script>`);
        }
    } else {
        await Basket.create({
            userId: req.user.id,
            instrumentId: instrumentId,
            count: count,
        })
        res.json({ 'success': 'basket 추가 완료.', userId: req.user.id, instrumentId, count })
    }
});

module.exports = router;