// Get database info
const db = require("../models/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

// Call database tables
const Users = db.users;

// Function used to get all tools
exports.signin = async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                user_email: req.body.user_email
            }
        });
        if (!user) return res.status(404).json({
            message: "User Not found."
        });
        // tests a string (password in body) against a hash (password in database)
        const passwordIsValid = await bcrypt.compareSync(
            req.body.user_password, user.user_password.toString()
        );

        if (
            !passwordIsValid
            // req.body.user_password != user.user_password
        ) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        // sign the given payload (user ID) into a JWT payload – builds JWT token, using secret key
        const token = jwt.sign({
            id: user.user_id
        }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        let role;
        if (user.user_type_id === 1)
            role = "admin"
        else if (user.user_type_id === 2)
            role = "professor"
        else
            role = "aluno"

        // Return
        return res.status(200).json({
            id: user.user_id,
            username: user.user_name,
            email: user.user_email,
            role: role,
            accessToken: token
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };

}

exports.signup = async (req, res) => {
    try {
        // check duplicate username
        let user = await Users.findOne({
            where: {
                user_email: req.body.user_email
            }
        });
        if (user)
            return res.status(400).json({
                message: "Failed! Email is already in use!"
            });
        // save User to database
        user = await Users.create({
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: bcrypt.hashSync(req.body.user_password, 8), // generates hash to password
            user_type_id: 1,
            banned_id: 1
        });

        return res.json({
            message: "User was registered successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
};

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    // verify request token given the JWT secret key
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.loggedUserId = decoded.id; // save user ID for future verifications
        next();
    });
};


exports.isAdmin = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserId);
    console.log(user.user_type_id)
    if (user.user_type_id == 1) {
        next();
        return;
    }
    return res.status(403).send({
        message: "Require Admin Role!"
    })
};

exports.isAdminOrLoggedUser = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserId);
    if (user.user_type_id === 1 || user.user_id === parseInt(req.params.userId)){
        next();
        return;
    }
    return res.status(403).send({
        message: "Require Admin Role!"
    });
};