const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send({
        message: "Here is the list of all categories."
    });
});

router.post('/', (req, res) => {
    res.send({
        message: "A new category has been created."
    });
});

module.exports = router;
