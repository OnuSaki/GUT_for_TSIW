// Get database info
const db = require("../models/db.js");
const bcrypt = require("bcryptjs");

// Call database table
const Users = db.users;

// Function used to get all users
exports.getAllUsers = async (req, res) => {
    Users.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        })
};

exports.getLoggedUser = async (req, res) => {
    let user = await Users.findByPk(req.loggedUserId)
    Users.findOne({
        where: {
            user_id: req.params.userId
        }
    })
        .then(data => {
            if (user.user_id === data.user_id || user.user_type_id === 1) {
                res.status(200).json(data);
                return;
            }
            res.status(400).json({messge: "User doesn't have permission"})
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving logged User."
            });
        })
}

// Function used to create a new user
exports.createUser = async (req, res) => {
    let user = await Users.findOne({where: {user_email: req.body.user_email}})
    console.log(user)
    if (user === null) {
        Users.create({
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: bcrypt.hashSync(req.body.user_password, 8), // generates hash to password
            user_type_id: req.body.user_type_id,
            banned_id: 1
        })
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
    } else {
        res.status(200).json("Email is already in use")
    }

};

// Function used to delete a user based on his id
exports.deleteUser = async (req, res) => {
    let user = await Users.findByPk(req.params.userId)
    if (user.user_type_id != 1) {
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
    } else {
        res.status(200).json({ message: "Can't delete an admin user" })
    }
};

// Function used to update a user based on his id
exports.updateUser = async (req, res) => {
    const user = await Users.findByPk(req.loggedUserId)
    let user_type; let banned;
    if (user.user_type_id === 1) {
        user_type = req.body.user_type_id
        banned = req.body.banned_id
    } else {
        user_type = user.user_type_id
        banned = user.banned_id
    }
    Users.update({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: bcrypt.hashSync(req.body.user_password, 8),
        user_type_id: user_type,
        banned_id: banned
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