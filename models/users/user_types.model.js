/**
 * Defining the User_types table for the database
 * This table is used to define the type of user that is in the database
 * The users can be "admin", "professor" and "student"
 * Each diferent type of user as diferent things that he is able to do in the application
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns User_types table
 */
module.exports = (sequelize, DataTypes) => {
    const User_types = sequelize.define("User_types", {
        user_type_id: { // Identifier
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type_desc: {   // Description that shows the type of user
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return User_types;
}