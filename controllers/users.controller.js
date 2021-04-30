const db = require("../models/db.js");

const Users = db.users;
const User_types = db.user_types;
const User_banned = db.user_banned;

const {
    Op
} = require('sequelize');

exports.getAllUsers = (req, res) => {
    Users.findAll()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    })
};

exports.createUser = (req, res) => {
    Users.create(req.body)
        .then(data => {
            res.status(201).json({
                message: "New User created.",
                location: "/users/" + data.user_id
            });
            
        })
        .catch(err => {
            // Tutorial model as validation for the title column (not null)
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({
                    message: err.errors[0].message
                });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the User."
                });
        });
};

exports.deleteUser = (req, res) => {
    Users.destroy({
        where: {
            user_id: req.params.userId
        }
    })
    .then(num => {
        if (num == 0) {
            res.status(200).json({
                message: `No User with id: ${req.params.userId} was found on the database.`
            });
            return;
        }
        res.status(200).json({
            message: "User deleted with success."
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error ocurred while trying to delete user.'
        })
    })
};

exports.getUserTypes = (req, res) => {
    User_types.findAll()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    })
};

exports.getBannedTypes = (req, res) => {
    User_banned.findAll()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    })
};