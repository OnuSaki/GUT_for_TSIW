require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.1.0.0';

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.status(200).json({
        message: 'home'
    });
});

app.use('/users', require('./routes/users.routes'));
app.use('/tools', require('./routes/tools.routes'));

app.get('*', function(req, res) {
    res.status(404).json({message: 'WHAAT??'});
});

app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));