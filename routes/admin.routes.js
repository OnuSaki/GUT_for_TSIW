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
    .get(authController.verifyToken, authController.isAdmin, usersController.getAllUsers)
    .post(authController.verifyToken, authController.isAdmin, usersController.createUser)

router.route('/users/:userId')
    .delete(authController.verifyToken, authController.isAdmin, usersController.deleteUser)
    .put(authController.verifyToken, authController.isAdmin, usersController.updateUser)

router.route('/tools')
    .get(authController.verifyToken, authController.isAdmin, toolsController.getAllTools)
    .post(authController.verifyToken, authController.isAdmin, toolsController.createTool)

router.route('/tools/comments')
    .get(authController.verifyToken, authController.isAdmin, toolsController.getComments)

router.route('/tools/comments/:commentId')
    .delete(authController.verifyToken, authController.isAdmin, toolsController.deleteComment)

router.route('/tools/:toolId')
    .get(authController.verifyToken, authController.isAdmin, toolsController.getOneTool)
    .put(authController.verifyToken, authController.isAdmin, toolsController.updateTool)
    .delete(authController.verifyToken, authController.isAdmin, toolsController.deleteTool)


router.route('/tools/:toolId/comments')
    .post(authController.verifyToken, authController.isAdmin, toolsController.createComment)

router.route('/subjects')
    .get(authController.verifyToken, authController.isAdmin, toolsController.getAllSubjects)
    .post(authController.verifyToken, authController.isAdmin, toolsController.createSubject)

router.route('/subjects/:subjectId')
    .delete(authController.verifyToken, authController.isAdmin, toolsController.deleteSubject);


// Route that responds to any other request that is not accounted
router.all('*', function (req, res) {
    res.status(404).json({
        message: 'Auth: what???'
    });
})

// Export tools router
module.exports = router;