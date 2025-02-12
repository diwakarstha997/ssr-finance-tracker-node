import express from 'express';

import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

// Initialize express app
const app = express();

// Define a port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded());

// Serve public file
app.use(express.static(path.join(__dirname, "public")));

// Home page Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"src","html","index.html"));
})

// Signup page Route 
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,"src","html","signup.html"));
})

// Signup POST route
app.post('/signup', (req, res) => {
    console.log(req);
    const { email, password, confirmPassword } = req.body;

    // Store email and password in file
    if(password !== confirmPassword) res.send('<p>Password did not match, Go to <a href="/signup">Signup</a></p>')

    const userRecord =  email + "|" + password + "\n";
    const fileName = __dirname + "/userList.csv";

    fs.appendFile(fileName, userRecord, (error) => {
        error
            ? console.log("Error", error.message)
            : console.log("Data saved successfully");
    });

    res.send('<p>Thank you for registration please <a href="/login">Login</a> to the app</p>')
})

// Login page Route 
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,"src","html","login.html"));
})

// Login POST Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // validating user detail
    const userRecord = email + "|" + password;
    const fileName = __dirname + "/userList.csv";

    fs.readFile(fileName, (error, data) => {
        if(error){
            return res.send(error.message);
        }

        const users = data.toString();

        users.includes(userRecord)
            ? res.redirect("/dashboard")
            : res.send('<p>Invalid Credential, <a href="/login">Login</a></p>');
    }) 
})

// Dashboard page Route 
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname,"src","html","dashboard.html"));
})

// Start the server 
app.listen(PORT, (error) => {
    error
        ? console.log(`Error: ${error.message}`)
        : console.log(`Server running on PORT:${PORT} \n http://localhost:${PORT}`);
})