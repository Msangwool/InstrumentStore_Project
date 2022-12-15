const { Administrator } = require('../models');

// 해당 아이디 관리자 정보 기져오기
exports.getAdministrator = (userId) => Administrator.findOne({
    where: { userId: userId || null }
})