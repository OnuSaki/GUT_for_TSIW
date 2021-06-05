// Call all the necessary modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Begin the creation of the server
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.1.0.0';

// Apply modules to the server
app.use(cors());
app.use(express.json());

// Routes 127.1.0.0:8080/
app.get('/', function (req, res) {
    res.status(200).json({
        message: 'home'
    });
});

// Call routes /users handler
app.use('/users', require('./routes/users.routes'));

// Call routes /tools handler
app.use('/tools', require('./routes/tools.routes'));

// Call routes /login handler
app.use('/auth', require('./routes/auth.routes'));

app.use('/admin', require('./routes/admin.routes'));

// Response to any other request that is not accounted
app.get('*', function(req, res) {
    res.status(404).json({message: 'WHAAT??'});
});

// Start the server on the port and host defined
app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));