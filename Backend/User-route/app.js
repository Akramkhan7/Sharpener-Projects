const express  =  require("express");
const app = express();
const port = 3000;


app.get('/orders', (req, res)=>{
    res.send({
        message: "Here are your orders"
    })
});

app.post('/orders', (req, res)=>{ 
    res.send({
        message: "A order has been created",
    })
});


app.get('/users', (req, res)=>{
    res.send({
        message: "Here is the list of all users"
    })
});

app.post('/users', (req, res)=>{ 
    res.send({
        message: "A new user has been added.",
    })
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
