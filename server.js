import express from 'express';

import path from 'path';

const __dirname = path.resolve();

// Initialize express app
const app = express();

// Define a port
const PORT = process.env.PORT || 3000;

// Serve public file
app.use(express.static(path.join(__dirname, "public")));

// Home page Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"src","html","index.html"));
})

// Login page Route 
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,"src","html","login.html"));
})

// Signup page Route 
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,"src","html","signup.html"));
})

// Start the server 
app.listen(PORT, (error) => {
    error
        ? console.log(`Error: ${error.message}`)
        : console.log(`Server running on PORT:${PORT} \n http://localhost:${PORT}`);
})