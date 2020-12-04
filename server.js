// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
port = 3000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`running on localhost, port: ${port}`);
    });
}

/* Routes */
// Add routes
app.get('/journals/0', (req, res) => {
    res.send(projectData);
    res.status(200);
});

app.post('/journals', (req, res) => {
    const data = req.body;
    projectData['temp'] = data.temp;
    projectData['date'] = data.date;
    projectData['feelings'] = data.feelings;

    res.send(projectData);
    res.status(200);
});

