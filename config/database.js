const database = {

	development: {
		username: "root",
		password: "root",
		database: "dbName",
		dialect: "mysql",
		options: {
			host: "localhost",
			dialect: "mysql",
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
		}
	},

	production: {
		username: "myuser",
		password: "mypassword",
		database: "dbName",
		dialect: "mysql",
		options: {
			host: "myserver.com",
			dialect: "mysql",
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
		}
	}
}

module.exports = database[process.env.NODE_ENV || 'development'];