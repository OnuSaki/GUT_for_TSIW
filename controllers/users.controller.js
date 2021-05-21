// Get database info
const db = require("../models/db.js");

// Call database table
const Users = db.users;

// Sequelize operator
const {
    Op
} = require('sequelize');

// Function used to get all users
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

// Function used to create a new user
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

// Function used to delete a user based on his id
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

// Function used to update a user based on his id
exports.updateUser = (req, res) => {
    Users.update({
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_type_id: req.body.user_type_id,
            banned_id: req.body.banned_id
        }, {
            where: {
                user_id: req.params.userId
            }
        })
        .then(data => {
            if (data[0] === 0) {
                res.status(200).json({
                    message: "No User was found with this id."
                })
                return;
            }
            res.status(200).json({
                message: "User updated with success!"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while updating User."
            })
        });
}