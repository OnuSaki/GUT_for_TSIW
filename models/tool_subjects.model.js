/**
 * Defining the Tool_subject table for the database
 * It is used to make a relation between the tools table and the subjects table
 * It exists because between the 2 tables it would be created an N:M relation so it need a association table
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns Tool_subject table
 */
module.exports = (sequelize, DataTypes) => {
    const Tool_subject = sequelize.define("Tool_subject", {
        tool_id: {  // Foreign key that determines the tool
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Tools',
                key: 'tool_id'
            }
        },
        subject_id: {   // Foreign key that determines the subject
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Subjects',
                key: 'subject_id'
            }
        }
    }, {
        timestamps: false
    });
    return Tool_subject;
}