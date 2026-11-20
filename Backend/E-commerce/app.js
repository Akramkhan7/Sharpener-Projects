const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Parse form data
app.use(express.static("public"));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




