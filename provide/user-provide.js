const users = require("../storage/user-storage.js");

// 해당 아이디 유저 가져오기
exports.getTarget = async (id) => {
    return await users.getUser(id);
}

// 아이디 생성
exports.createUser = async (id, hash, name, description, phoneNumber, email) => {
    await users.createUser(id, hash, name, description, phoneNumber, email);
}

// 아이디 수정
exports.updateUser = async (updateUser, id) => {
    return await users.updateUser(updateUser, id);
}

// 아이디 삭제
exports.destroyUser = async (id) => {
    return await users.destroyUser(id);
}