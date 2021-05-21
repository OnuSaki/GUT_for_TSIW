/**
 * Defining the comments table for the database
 * It is used to save all the comments that users insert into a tool
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns Comments table
 */
 module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        comment_id: {   // Identifier of each comment
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_desc: { // The comment itself
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Comments;
}