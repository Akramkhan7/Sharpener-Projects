
const express = require("express");

const app = express();
const port = 4000;

// GET all products
app.get("/products", (req, res) => {
    res.send({
        message: "Here is the list of all products.",
    });
});

// POST a new product
app.post("/products", (req, res) => {
    res.send({
        message: "A new product has been added.",
    });
});

// GET all categories
app.get("/categories", (req, res) => {
    res.send({
        message: "Here is the list of all categories."
    });
});

// POST a new category
app.post("/categories", (req, res) => {
    res.send({
        message: "A new category has been created."
    });
});

// Handle all undefined routes
app.use('*',(req, res) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
