/**
 * Defining the Tools table for the database
 * It is used to save all the tools that are submited to the database
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns Tools table
 */
module.exports = (sequelize, DataTypes) => {
    const Tools = sequelize.define("Tools", {
        tool_id: {  // Tool identifier
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tool_name: {    // Tool name
            type: DataTypes.STRING,
            allowNull: false
        },
        toll_desc: {    // Tool description
            type: DataTypes.STRING,
            allowNull: false
        },
        tool_state_id: {    // Foreign key provided from the table Tool_states that determines if the tool is published or deleted
            type: DataTypes.INTEGER,
            references: {
                model: 'Tool_states',
                key: 'tool_state_id'
            }
        }
    }, {
        timestamps: false
    });
    return Tools;
}