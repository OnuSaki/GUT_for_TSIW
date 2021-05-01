/**
 * Defining the Users table for the database
 * It is used to save all the data associated with the users
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns Users table
 */
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        user_id: {  // User identifier
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {    // User real name
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {   // User email, with a validation that checks if the text insered is an email type text
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        user_password: {    // User password
            type: DataTypes.STRING,
            allowNull: false
        },
        user_type_id: { // Foreign key that provides the type of user
            type: DataTypes.INTEGER,
            references: {
                model: 'User_types',
                key: 'user_type_id'
            }
        },
        banned_id: {    // Foreign key that provides if the user is banned or if he is able to enter the app
            type: DataTypes.INTEGER,
            references: {
                model: 'User_banned',
                key: 'banned_id'
            }
        }
    }, {
        timestamps: false
    });
    return Users;
};