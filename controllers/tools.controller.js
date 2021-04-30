const db = require("../models/db.js");

const Users = db.users;
const User_types = db.user_types;
const User_banned = db.user_banned;

const {
    Op
} = require('sequelize');

exports.getAllTools = (req, res) => {
    res.status(200).json({message: "hello"})
}