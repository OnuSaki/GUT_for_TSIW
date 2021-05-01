/**
 * Defining the User_banned table for the database
 * It is used to determine if a user is banned or not or even unbanned
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns User_banned table
 */
module.exports = (sequelize, DataTypes) => {
    const User_banned = sequelize.define("User_banned", {
        banned_id: {    // Identifier
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        banned_desc: {  // Description that demonstrates the state of the user
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return User_banned;
}