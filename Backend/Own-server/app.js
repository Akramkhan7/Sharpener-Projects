const express = require("express");

const app = express();

const PORT = 3000;

//custom middleware

app.use((req, res, next)=>{
    req.user = 'Guest';
    next();
});


app.get('/welcome', (req, res)=>{
    res.send({
        message: `Welcome ${req.user} to the server!`
    })
})


app.listen(PORT, () => {
  console.log("Server is up and running on port 3000! Ready to handle requests.");
});