const express = require("express");
const corsMiddleware = require("./config/cors");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const orderRoutes = require("./routes/order.routes");       
const reviewRoutes = require("./routes/review.routes");     
const sellerRoutes = require("./routes/seller.routes");
const marketplaceRoutes = require("./routes/marketplace.routes");
const storeRoutes = require("./routes/store.routes");
const cartRoutes = require("./routes/cart.routes");



require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 5001;

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/cart", cartRoutes);


app.get("/", (req, res) => {
  res.status(200).send("<h1>ArtisanBazaar Backend Running 🚀</h1>");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
