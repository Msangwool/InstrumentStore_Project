const Sequelize = require('sequelize');

module.exports = class Instrument extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            instrumentId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            cost: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            category: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            creatorId: {        // FK - administrator 이름
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Instrument',
            tableName: 'instruments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Instrument.belongsTo(db.User, { foreignKey: 'creatorId', sourceKey: 'id' });
    }
};
