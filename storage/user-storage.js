const { User } = require('../models');


// 해당 아이디 유저 정보 가져오기
exports.getUser = (id) => User.findOne({ where: { id } });

// 아이디 생성
exports.createUser = (id, hash, name, description, phoneNumber, email) => User.create({
    id,
    password: hash,
    name,
    description,
    phoneNumber,
    email,
});

// 아이디 수정
exports.updateUser = (updateUser, id) => User.update(
    updateUser,
    {
        where: { id }
    });

// 아이디 삭제
exports.destroyUser = (id) => User.destroy({
    where: { id }
});
