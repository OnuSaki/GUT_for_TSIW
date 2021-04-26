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

router.all('*', function (req, res) {
    res.status(404).json({
        message: 'TUTORIALS: what???'
    });
})

module.exports = router;