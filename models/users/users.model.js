module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User_types',
                key: 'user_type_id'
            }
        },
        banned_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User_banned',
                key: 'banned_id'
            }
        }
    }, {
        timestamps: false
    });
    return Users;
};