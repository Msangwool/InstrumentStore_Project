const baskets = require("../storage/basket-storage.js");

// 해당 장바구니 모두 가져오기
exports.getAllBasket = async (userId) => {
    return await baskets.getAllBasket(userId);
}

// 장바구니 생성
exports.createBasket = async (userId, instrumentId, count) => {
    await baskets.createBasket(userId, instrumentId, count);
}

// 장바구니 수정
exports.updateBasket = async (sum, basketId) => {
    return await baskets.updateBasket(sum, basketId);
}

// 기존 장바구니 조회 (중복 체크)
exports.duplicateCheck = async (instrumentId, userId) => {
    return await baskets.getDuplicateCheck(instrumentId, userId);
}