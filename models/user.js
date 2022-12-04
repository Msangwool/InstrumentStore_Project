const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            phoneNumber: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // db.User.hasMany(db.Administrator, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
        // db.User.hasMany(db.Address, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
        // db.User.hasMany(db.Basket, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
        // db.User.hasMany(db.Order, { foreignKey: 'userId', sourceKey: 'id'});
    }
};
