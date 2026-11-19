const express = require("express");
const router = express.Router();


router.get('/:userId',(req, res)=>{
    res.send(`Fetch cart for user with ID: ${req.params.userId}`);
})

router.post('/:userId',(req, res)=>{
    res.send(`Add item to cart for user with ID: ${req.params.userId}`);
})


module.exports = router;