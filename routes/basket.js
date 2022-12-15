const express = require('express');
const { redirect } = require('express/lib/response');
const provideBasket = require('../provide/basket-provide.js');
const { isLoggedIn } = require('./helpers');

const router = express.Router();

// http://localhost:3000/basket
router.route('/')
    .get(isLoggedIn, async (req, res, next) => {

        const baskets = await provideBasket.getAllBasket(req.user.id);

        if (baskets) {
            res.json(baskets);
        }
        else { res.json({ 'success': '장바구니가 존재하지 않습니다.' }) }
    });

// http://localhost:3000/basket/create
router.post('/create', isLoggedIn, async (req, res, next) => {
    const { instrumentId, count } = req.body;
    const basket = await provideBasket.duplicateCheck(instrumentId, req.user.id);

    if (basket) {
        const sum = parseInt(basket.count) + parseInt(count);
        const result = await provideBasket.updateBasket(sum, basket.basketId);
        if (result) {
            res.json({ success: '기존 장바구니에 추가 되었습니다.' });
        } else {
            res.json({ fail: '기존 장바구니에 수정 실패입니다.' });
        }
    } else {
        await provideBasket.createBasket(req.user.id, instrumentId, count);
        res.json({ success: 'basket 추가 완료.', userId: req.user.id, instrumentId, count })
    }
});

module.exports = router;