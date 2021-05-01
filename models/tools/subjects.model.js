/**
 * Defining the subjects table for the database
 * It is used to save all the subjects that are intended to be used on the platform
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns Subject table
 */
module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define("Subjects", {
        subject_id: {   // Identifier of each subject
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subject_desc: { // The initials of each subject
            type: DataTypes.STRING,
            allowNull: false
        },
        subject_name: { // The complete namo of the subject
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Subject;
}