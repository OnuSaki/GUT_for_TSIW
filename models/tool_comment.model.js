/**
 * Defining the Tool_Comments table for the database
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns Tool_subject table
 */
 module.exports = (sequelize, DataTypes) => {
    const Tool_Comments = sequelize.define("Tool_Comments", {
        tool_id: {  // Foreign key that determines the tool
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Tools',
                key: 'tool_id'
            }
        },
        comment_id: {   // Foreign key that determines the comment
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Comments',
                key: 'comment_id'
            }
        },
        user_id: {  // Foreign key that determines the user that made the comment
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        }
    }, {
        timestamps: false
    });
    return Tool_Comments;
}