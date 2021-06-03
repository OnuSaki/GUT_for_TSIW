// Get database info
const db = require("../models/db.js");

// Call database tables
const Tools = db.tools;
const UserToolLike = db.user_tool_like;
const ToolComment = db.tool_comments;

// Sequelize operator
const {
    Op
} = require('sequelize');

// Function used to get all tools
exports.getAllTools = (req, res) => {
    Tools.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        })
}

exports.likeTool = (req, res) => {
    
}