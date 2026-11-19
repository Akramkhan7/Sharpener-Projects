
const express = require('express');

const app = express();

// Import routers
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');

// Home Route
app.get('/', (req, res) => {
    res.send("Welcome to the Student & Course Portal API!");
});

// Mount student routes
app.use('/students', studentRoutes);

// Mount course routes
app.use('/courses', courseRoutes);

// Custom 404 Handler
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
