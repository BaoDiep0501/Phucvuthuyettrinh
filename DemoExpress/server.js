const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use((req, res, next) => {
    const time = new Date().toLocaleTimeString();

    console.log(`[${time}] ${req.method} ${req.url}`);

    next();
});

// Route
app.get("/", (req, res) => {
    res.send("Node.js & Express.js Fundamentals");
});

app.get("/hello", (req, res) => {
    res.json({
        message: "Hello"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});