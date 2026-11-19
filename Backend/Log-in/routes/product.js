const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {     
    res.send({
        message: "Here is the list of all products."
    });
});

router.post('/', (req, res) => {
    res.send({
        message: "A new product has been added."
    });
});

module.exports = router;