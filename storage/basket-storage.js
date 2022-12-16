const { Basket } = require('../models');

// 해당 아이디로 된 모든 장바구니
exports.getAllBasket = (userId) => Basket.findAll({
    where: { userId }
});

// 장바구니 중복 체크
exports.getDuplicateCheck = (instrumentId, userId) => Basket.findOne({
    where: {
        instrumentId,
        userId
    }
})

// 장바구니 생성
exports.createBasket = (userId, instrumentId, count) => Basket.create({
    userId,
    instrumentId,
    count
})

// 장바구니 수정
exports.updateBasket = (sum, basketId) => Basket.update(
    { count: sum },
    {
        where: {
            basketId,
        }
    });

    