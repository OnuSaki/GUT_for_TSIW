module.exports = (sequelize, DataTypes) => {
    const Tools = sequelize.define("Tools", {
        tool_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tool_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        toll_desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tool_state_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Tool_states',
                key: 'tool_state_id'
            }
        }
    }, {
        timestamps: false
    });
    return Tools;
}