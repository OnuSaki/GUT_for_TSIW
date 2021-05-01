// Get database info
const db = require("../models/db.js");

// Call database tables
const Users = db.users;
const User_types = db.user_types;
const User_banned = db.user_banned;

// Sequelize operator
const {
    Op
} = require('sequelize');

// Function used to get all tools
exports.getAllTools = (req, res) => {
    res.status(200).json({message: "hello"})
}