// Call express
const express = require('express');

// Call express router
let router = express.Router();

// Get the tools controller file
const toolsController = require('../controllers/tools.controller');
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

// Function used to determine the time that it takes to make a request
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const diffSeconds = (Date.now() - start) / 1000;
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next()
})

router.route('/users')
    .post(authController.signin);

router.route('/tools')
    .post(authController.signup);

router.route('/subjects')
    .post(authController.signup);


// Route that responds to any other request that is not accounted
router.all('*', function (req, res) {
    res.status(404).json({
        message: 'Auth: what???'
    });
})

// Export tools router
module.exports = router;