module.exports = (sequelize, DataTypes) => {
    const User_banned = sequelize.define("User_banned", {
        banned_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        banned_desc: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return User_banned;
}