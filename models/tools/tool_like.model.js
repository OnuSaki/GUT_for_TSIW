module.exports = (sequelize, DataTypes) => {
    const Tool_likes = sequelize.define("Tool_likes", {
        tool_like_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tool_like_desc: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Tool_likes;
}