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
                type: Sequelize.BIGINT,
                allowNull: false
            },
            instrumentId: { // FK
                type: Sequelize.BIGINT,
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
        // db.User.hasMany(db.Comment, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
    }
};
