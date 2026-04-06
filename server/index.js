require('dotenv').config()
const express = require('express')
const sequelize = require('./models/index')
const router = require('./routes/index')
const PORT = process.env.PORT || 5000
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json())
app.use('/api', router)


async function checkDBConnection() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (err) {
		console.log('Unable to connect to the database:');
		console.log(err.message);
		process.exit(1);
	}
}

const start = async () => {
    console.log('START')
    try {
        await checkDBConnection()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}

start()