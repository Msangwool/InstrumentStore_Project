const Sequelize = require('sequelize');
const User = require('./user');
const Administrator = require('./administrator');
const Basket = require('./basket');
const Instrument = require('./instrument');


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const db = {
    sequelize,
    User,
    Administrator,
    Basket,
    Instrument,
};

User.init(sequelize);
Administrator.init(sequelize);
Basket.init(sequelize);
Instrument.init(sequelize);

User.associate(db);
Administrator.associate(db);
Basket.associate(db);
Instrument.associate(db);
module.exports = db;
