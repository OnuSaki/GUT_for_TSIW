/**
 * Defining the tool_like table for the database
 * It is used to determine if the user gave a like or a deslike on a tool
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns Tool_likes table
 */
module.exports = (sequelize, DataTypes) => {
    const Tool_likes = sequelize.define("Tool_likes", {
        tool_like_id: { // Identifier of the like type
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tool_like_desc: {   // Description to demonstrate if it is a like or a deslike
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Tool_likes;
}