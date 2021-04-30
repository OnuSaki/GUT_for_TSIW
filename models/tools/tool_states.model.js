module.exports = (sequelize, DataTypes) => {
    const Tool_states = sequelize.define("Tool_states", {
        tool_state_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tool_state_desc: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Tool_states;
}