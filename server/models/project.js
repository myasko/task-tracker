const {DataTypes} = require('sequelize')

module.exports = (sequelize) => { 
    sequelize.define('project', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
        description:{type : DataTypes.STRING(500)},
        start_date:{type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW},
        deadline:{type: DataTypes.DATEONLY},
        priority:{type: DataTypes.INTEGER, validate: { min: 1, max: 5}, defaultValue: 3},
        status:{type: DataTypes.STRING(20), defaultValue: 'active', validate: { isIn: [['active', 'completed']],},},
    }, {
        timestamps: false
    })
}

