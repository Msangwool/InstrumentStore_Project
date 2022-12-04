const Sequelize = require('sequelize');

module.exports = class Address extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            addressId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            zipCode: { // 우편번호
                type: Sequelize.INTEGER,
                allowNull: false
            },
            userId: { // FK
                type: Sequelize.BIGINT,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Address',
            tableName: 'addresses',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // db.User.hasMany(db.Comment, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
    }
};
