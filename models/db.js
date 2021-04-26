const dbConfig = require('../config/db.config.js');
//export classes Sequelize and Datatypes
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

//optional, test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.sequelize = sequelize; //export the Sequelize instance (actual connection pool)

// /** Create database tables
const User_types = sequelize.define("User_types", {
    user_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_type_desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const User_banned = sequelize.define("User_banned", {
    banned_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    banned_desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const Users = sequelize.define("Users", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User_types,
            key: 'user_type_id'
        }
    },
    banned_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User_banned,
            key: 'banned_id'
        }
    }
});

db.sequelize.sync()
    .then(() => {
        console.log('DB is successfully synchronized')
    })
    .catch(e => {
        console.log(e)
    });
// */

module.exports = db;