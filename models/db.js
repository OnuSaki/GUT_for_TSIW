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

//User tables
db.users = require('./users/users.model')(sequelize, DataTypes);
db.user_types = require('./users/user_types.model')(sequelize, DataTypes);
db.user_banned = require('./users/user_banned.model')(sequelize, DataTypes);
db.user_tool_like = require('./users/user_tool_like.model')(sequelize, DataTypes);

//Tools tables
db.subjects = require('./tools/subjects.model')(sequelize, DataTypes);
db.tools = require('./tools/tools.model')(sequelize, DataTypes);
db.tool_states = require('./tools/tool_states.model')(sequelize, DataTypes);
db.tool_subject = require('./tools/tool_subjects.model')(sequelize, DataTypes);
db.tool_like = require('./tools/tool_like.model')(sequelize, DataTypes);

db.subjects.belongsToMany(db.tools, {
    through: db.tool_subject
});
db.tools.belongsToMany(db.subjects, {
    through: db.tool_subject
});

db.users.belongsToMany(db.tools, {
    through: db.user_tool_like
});
db.tools.belongsToMany(db.users, {
    through: db.user_tool_like
});

db.sequelize.sync()
    .then(() => {
        console.log('DB is successfully synchronized')
    })
    .catch(e => {
        console.log(e)
    });

module.exports = db;