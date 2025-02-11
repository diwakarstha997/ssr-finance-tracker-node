import express from 'express';

// Initialize express app
const app = express();

// Define a port
const PORT = process.env.PORT || 3000;

// Start the server 
app.listen(PORT, (error) => {
    error
        ? console.log(`Error: ${error.message}`)
        : console.log(`Server running on PORT:${PORT}`);
})