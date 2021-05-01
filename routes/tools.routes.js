// Call express
const express = require('express');

// Call express router
let router = express.Router();

// Get the tools controller file
const toolsController = require('../controllers/tools.controller');

// Function used to determine the time that it takes to make a request
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const diffSeconds = (Date.now() - start) / 1000;
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

// Routes 127.1.0.0:8080/tools/
router.route('/')
    .get(toolsController.getAllTools)

// Route that responds to any other request that is not accounted
router.all('*', function (req, res) {
    res.status(404).json({
        message: 'Tools: what???'
    });
})

// Export tools router
module.exports = router;