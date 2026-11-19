const express = require("express");
const router =express.Router();

// Demo users data
router.get("/", (req, res) => {
    res.send('Fetch all users.');
});


router.post("/", (req, res) => {
    res.send('Add a new user.');
});


router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Fetch a user with ID: ${id}`);
});


module.exports = router;