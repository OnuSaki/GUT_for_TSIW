/**
 * Get all the data that is related to the database
 * It contains the host server and the credentials to get into the database
 */
const config = {
    HOST: process.env.DB_HOST || 'sql11.freemysqlhosting.net',
    USER: process.env.DB_USER || 'sql11408199',
    PASSWORD: process.env.DB_PASSWORD || 'ihrIu3b4Tb',
    DB: process.env.DB_NAME || 'sql11408199',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

};

// Export database config
module.exports = config;