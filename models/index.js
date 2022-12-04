const Sequelize = require('sequelize');
const User = require('./user');
const Administrator = require('./administrator');
const Address = require('./address');
const Basket = require('./basket');
const Instrument = require('./instrument');
const Order = require('./order');


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const db = {
    sequelize,
    User,
    Administrator,
    Address,
    Basket,
    Instrument,
    Order,
};

User.init(sequelize);
Administrator.init(sequelize);
Address.init(sequelize);
Basket.init(sequelize);
Instrument.init(sequelize);
Order.init(sequelize);

User.associate(db);
Administrator.associate(db);
Address.associate(db);
Basket.associate(db);
Instrument.associate(db);
Order.associate(db);

module.exports = db;
