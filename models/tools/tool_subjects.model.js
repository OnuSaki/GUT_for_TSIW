module.exports = (sequelize, DataTypes) => {
    const Tool_subject = sequelize.define("Tool_subject", {
        tool_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Tools',
                key: 'tool_id'
            }
        },
        subject_id: {
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