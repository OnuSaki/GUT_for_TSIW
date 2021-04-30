const dbConfig = require('../config/db.config.js');

const {
    Sequelize,
    DataTypes
} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
    // ,
    // pool: {
    //     max: dbConfig.pool.max,
    //     min: dbConfig.pool.min,
    //     acquire: dbConfig.pool.acquire,
    //     idle: dbConfig.pool.idle
    // }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.sequelize = sequelize;

db.users = require('./users/users.model')(sequelize, DataTypes);
db.user_types = require('./users/user_types.model');
db.user_banned = require('./users/user_banned.model');

// db.sequelize.sync()
//     .then(() => {
//         console.log('DB is successfully synchronized')
//     })
//     .catch(e => {
//         console.log(e)
//     });

module.exports = db;