/**
 * Defining the User_tool_likes table for the database
 * This table is used to save all the tools that a certain user as liked or desliked
 * It is an association table, as the association from the users and tools table would be a N:M association
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns User_tool_like
 */
module.exports = (sequelize, DataTypes) => {
    const User_tool_likes = sequelize.define("User_tool_likes", {
        user_id: {  // Foreign key that determines the user
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        },
        tool_id: {  // Foreign key that determines the tool
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Tools',
                key: 'tool_id'
            }
        },
        tool_like_id: {  // Foreign key that determines the type of apreciation the user gave
            type: DataTypes.INTEGER,
            references: {
                model: 'Tool_likes',
                key: 'tool_like_id'
            }
        }
    }, {
        timestamps: false
    });
    return User_tool_likes;
}