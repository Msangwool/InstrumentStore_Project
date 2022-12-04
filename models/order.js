const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            orderId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            userId: { // FK
                type: Sequelize.BIGINT,
                allowNull: false
            },
            instrumentId: { // FK
                type: Sequelize.BIGINT,
                allowNull: false
            },
            addressId: { // FK
                type: Sequelize.BIGINT,
                allowNull: false
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            creatorId: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Order',
            tableName: 'orders',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // db.User.hasMany(db.Comment, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
    }
};
