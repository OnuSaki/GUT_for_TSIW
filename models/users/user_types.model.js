module.exports = (sequelize, DataTypes) => {
    const User_types = sequelize.define("User_types", {
        user_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type_desc: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return User_types;
}