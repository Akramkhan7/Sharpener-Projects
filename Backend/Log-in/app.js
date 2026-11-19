const express = require("express");
const app = express();



//middleware

app.use('/products', (req, res, next) => {
 console.log(`${req.method} request made to ${req.url}`);
  next();
});


app.get("/products", (req, res) => {
  res.send({
    message: "Here is the list of all products.",
  });
});

app.post("/products", (req, res) => {
  res.send({
    message: "A new product has been added."
  });
});

app.get("/categories", (req, res) => {
  res.send({
    message: "Here is the list of all categories."
  });
});


app.post("/categories", (req, res) => {
  res.send({
    message: "A new category has been created."
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
