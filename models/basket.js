const Sequelize = require('sequelize');

// 장바구니 테이블
module.exports = class Basket extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            basketId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            userId: { // FK
                type: Sequelize.STRING(100),
                allowNull: false
            },
            instrumentId: { // FK
                type: Sequelize.STRING(100),
                allowNull: false
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Basket',
            tableName: 'baskets',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Basket.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    }
};
