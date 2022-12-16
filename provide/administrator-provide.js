const administrators = require("../storage/administrator-storage.js");

exports.getTarget = async (userId) => {
    return await administrators.getAdministrator(userId);
}

