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
        user_type_id: { // User type (e.g. admin, professor, student)
            type: DataTypes.INTEGER,
            allowNull: false
        },
        banned_id: {    // Validation if the user is banned
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Users;
};