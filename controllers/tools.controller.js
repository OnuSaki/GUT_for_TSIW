// Get database info
const db = require("../models/db.js");

// Call database tables
const Tools = db.tools;
const Comments = db.comments;
const ToolComments = db.tool_comments;
const UserToolLike = db.user_tool_like;

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

exports.getOneTool = (req, res) => {
    Tools.findOne({
        where: {
            tool_id: req.params.toolId
        }
    })
        .then(data => {
            if (data === null) {
                res.status(200).json({
                    message: `Tool with id: ${req.params.toolId} doesn't exist!`
                });
                return;
            }
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        })
}

exports.createTool = (req, res) => {
    Tools.create({
        tool_name: req.body.tool_name,
        toll_desc: req.body.tool_desc, // generates hash to password
        tool_state_id: 1
    })
        .then(data => {
            res.status(201).json({
                message: "New Tool created.",
                location: "/tools/" + data.tool_id
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
                    message: err.message || "Some error occurred while creating the Tool."
                });
        });
}

exports.updateTool = (req, res) => {
    Tools.update({
        tool_name: req.body.tool_name,
        toll_desc: req.body.tool_desc,
        tool_state_id: req.body.tool_state_id
    }, {
        where: {
            tool_id: req.params.toolId
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

exports.deleteTool = (req, res) => {
    Tools.destroy({
        where: {
            tool_id: req.params.toolId
        }
    })
        .then(num => {
            if (num == 0) {
                res.status(200).json({
                    message: `No User with id: ${req.params.toolId} was found on the database.`
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
}

exports.createComment = (req, res) => {
    Comments.create({
        comment_desc: req.body.comment
    })
        .then(data => {
            ToolComments.create({
                tool_id: req.params.toolId,
                comment_id: data.comment_id,
                user_id: req.loggedUserId
            })
                .then(data2 => {
                    res.status(201).json({
                        data,
                        data2
                    });
                    return;
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

exports.leaveLike = (req, res) => {
    UserToolLike.findOne({
        where: {
            user_id: req.loggedUserId,
            tool_id: req.params.toolId
        }
    })
        .then(data => {
            if (data === null) {
                UserToolLike.create({
                    user_id: req.loggedUserId,
                    tool_id: req.params.toolId,
                    like_desc: req.body.like
                })
                    .then(data2 => {
                        res.status(200).json(data2);
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
            }
            res.status(200).json({
                message: "Like/Deslike already given!"
            })
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

exports.getComments = (req, res) => {
    Comments.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        })
}