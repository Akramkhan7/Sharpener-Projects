const express = require("express");
const bookRoutes = require("./routes/book");
const categoriesRoutes = require("./routes/categories");
const app = express();



//middleware

// app.use('/products', (req, res, next) => {
//  console.log(`${req.method} request made to ${req.url}`);
//   next();
// });

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/categories', categoriesRoutes);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
