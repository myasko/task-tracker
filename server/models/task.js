
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => { 
     sequelize.define('task', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING, allowNull: false},
        description: {type : DataTypes.STRING(500)},
        start_date: {type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW},
        deadline: {type: DataTypes.DATEONLY},
        estimated_hours: {type: DataTypes.DECIMAL(6,2)}, 
        priority: {type: DataTypes.INTEGER, validate: { isIn: [0, 1] }, defaultValue: 0},
        status: {type: DataTypes.STRING(20), defaultValue: 'todo', validate: { isIn: [['todo', 'in_progress', 'done']],},},
    },{
        timestamps: false
    })
}
