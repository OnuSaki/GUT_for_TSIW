module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define("Subjects", {
        subject_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subject_desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Subject;
}