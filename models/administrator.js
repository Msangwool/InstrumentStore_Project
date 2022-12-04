const Sequelize = require('sequelize');

module.exports = class Administrator extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            adminId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false
            } 
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Administrator',
            tableName: 'administrators',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        
    }
};
