const path = require('path');  // require path to create paths
const express = require('express');  // npm i express to install
var bodyParser = require('body-parser');
require('./db/mongoose');
const User = require('./models/user');
const Concern = require('./models/concern')
const router = new express.Router();

// Call express function to variable app
const app = express();

// Create public directory path
const publicPath = path.join(__dirname, '../public');

// Setup static directory to serve
app.use(express.static(publicPath));
app.use( bodyParser.json());  
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(express.json());

app.get('', (req, res) => { // defaults to home page
    // Create path to home.html
    const homePath = path.join(publicPath, '/home.html');
    // Send the home.html file as a response
    res.sendFile(homePath);
});

app.get('/home', (req, res) => { // home page
    // Create path to home.html
    const homePath = path.join(publicPath, '/home.html');
    // Send the home.html file as a response
    res.sendFile(homePath);
});

app.get('/login', (req,res) => {  // login page
    // Create path to login.html
    const loginPath = path.join(publicPath, '/login.html');
    // Send the login.html file as a response
    res.sendFile(loginPath);
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.uname, req.body.psw)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

app.get('/profile', (req,res) => {  // profile page
    // Create path to profile.html
    const loginPath = path.join(publicPath, '/profile.html');
    // Send the login.html file as a response
    res.sendFile(loginPath);
});

app.post('/profile', async (req,res) => {
    const user = new User(req.body);
    console.log(user);
    try {
        await user.save();
        res.status(201).send('User registered!');
    } catch (e) {
        res.status(400).send('Could not register user. Check to assure you filled out each field correctly.');
    }
});

app.get('/concern', (req,res) => {  // concern page
    // Create path to concern.html
    const concernPath = path.join(publicPath, '/concern.html');
    // Send the concern.html file as a response
    res.sendFile(concernPath);
});
app.post('/concern', async (req,res) => {
    const concern = new Concern(req.body);
    console.log(concern);
    try {
        await concern.save();
        res.status(201).send('Concern sent!');
    } catch (e) {
        res.status(400).send('Concern status failed! Check to assure you filled out each field correctly.');
    }
});

app.get('/contact', (req,res) => {  // contact page
    // Create path to contact.html
    const contactPath = path.join(publicPath, '/contact.html');
    // Send the contact.html file as a response
    res.sendFile(contactPath);
});


app.get('/directory', (req,res) => {  // directory home
    // Create path to directoryBusiness.html
    const businessPath = path.join(publicPath, '/directoryBusiness.html');
    // Send the directoryBusiness.html file as a response
    res.sendFile(businessPath);
});

app.get('/directory/business', (req,res) =>{
        // Create path to directoryBusiness.html
        const businessPath = path.join(publicPath, '/directoryBusiness.html');
        // Send the directoryBusiness.html file as a response
        res.sendFile(businessPath);
});

app.get('/directory/support', (req,res) =>{
        // Create path to directorySupport.html
        const supportPath = path.join(publicPath, '/directorySupport.html');
        // Send the directorySupport.html file as a response
        res.sendFile(supportPath);
});

app.get('/directory/events', (req,res) =>{
        // Create path to directoryEvents.html
        const eventsPath = path.join(publicPath, '/directoryEvents.html');
        // Send the directoryEvents.html file as a response
        res.sendFile(eventsPath);
});


// Start the localhost server on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
