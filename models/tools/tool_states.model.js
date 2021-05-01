/**
 * Defining the Tool_states table for the database
 * It is used to define if a tool is published or if it was deleted
 * This comes from "good manners" while dealing with a proper database that is not suposed to delete something immediately
 * Instead it turns a variable on the database that is controled by a controller that makes the "deleted" tool not appear anymore on the interface
 * It can be created a function that, from time to time, goes through the database deleting definitively the "deleted" tools
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns Tool_states table
 */
module.exports = (sequelize, DataTypes) => {
    const Tool_states = sequelize.define("Tool_states", {
        tool_state_id: { // Identifier of the tool state
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tool_state_desc: {  // Description determing if the tool is published or deleted
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Tool_states;
}