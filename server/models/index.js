const {Sequelize} = require('sequelize')


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

const modelDefiners = [
  require('./project'),
  require('./task'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

function applyExtraSetup(sequelize) {
	const { project, task } = sequelize.models;

	project.hasMany(task);
	task.belongsTo(project);
}

applyExtraSetup(sequelize)

module.exports = sequelize