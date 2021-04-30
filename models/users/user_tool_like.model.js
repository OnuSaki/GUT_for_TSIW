module.exports = (sequelize, DataTypes) => {
    const User_tool_likes = sequelize.define("User_tool_likes", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        },
        tool_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Tools',
                key: 'tool_id'
            }
        },
        tool_like_id: {
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