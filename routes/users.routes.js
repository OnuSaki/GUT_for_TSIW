// Call express
const express = require('express');

// Call express router
let router = express.Router();

// Get the users controller file
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

// Function used to determine the time that it takes to make a request
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const diffSeconds = (Date.now() - start) / 1000;
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

// Routes 127.1.0.0:8080/users/
router.route('/')
    .get(authController.verifyToken, authController.isAdmin, usersController.getAllUsers)
    .post(authController.verifyToken, authController.isAdmin, usersController.createUser)

// Routes 127.1.0.0:8080/users/:userId, routes that need the user ID
router.route('/:userId')
    .get(authController.verifyToken, authController.isAdminOrLoggedUser, usersController.getLoggedUser)
    .delete(usersController.deleteUser)
    .put(usersController.updateUser)

// Route that responds to any other request that is not accounted
router.all('*', function (req, res) {
    res.status(404).json({
        message: 'Users: what???'
    });
})

// Export routes router
module.exports = router;