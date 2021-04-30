const express = require('express');

let router = express.Router();

const usersController = require('../controllers/users.controller');

router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const diffSeconds = (Date.now() - start) / 1000;
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)

router.route('/usertypes')
    .get(usersController.getUserTypes)

router.route('/banned')
    .get(usersController.getBannedTypes)

router.route('/:userId')
    .delete(usersController.deleteUser)

router.all('*', function (req, res) {
    res.status(404).json({
        message: 'Users: what???'
    });
})

module.exports = router;