const { prisma } = require("../config/database");
const cloudinary = require("../utils/cloudinary");

// Upload helper
async function uploadToCloud(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "artisanbazaar/products" }, (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      })
      .end(buffer);
  });
}

/* ----------------------------------------------------------
   CREATE PRODUCT  (SELLER ONLY)
---------------------------------------------------------- */
async function createProduct(req, res) {
  try {
    const sellerId = req.user.id;
    const { title, description, price, stock, categoryId } = req.body;

    if (!title || !price || !categoryId) {
      return res.status(400).json({ ERROR: "Missing required fields" });
    }

    // Upload images
    let imageUrls = [];
    if (req.files?.length) {
      imageUrls = await Promise.all(
        req.files.map((file) => uploadToCloud(file.buffer))
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        stock: Number(stock) || 1,
        categoryId,
        sellerId,
        images: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ ERROR: "Failed to create product" });
  }
}

/* ----------------------------------------------------------
   MAIN MARKETPLACE ENDPOINT  (PUBLIC)
---------------------------------------------------------- */
async function getAllProducts(req, res) {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category) where.categoryId = category;

    if (minPrice || maxPrice) {
      where.price = {
        gte: minPrice ? parseFloat(minPrice) : undefined,
        lte: maxPrice ? parseFloat(maxPrice) : undefined,
      };
    }

    let orderBy = {};
    if (sort === "newest") orderBy = { createdAt: "desc" };
    else if (sort === "price_low") orderBy = { price: "asc" };
    else if (sort === "price_high") orderBy = { price: "desc" };
    else if (sort === "popular") orderBy = { featured: "desc" };

    const products = await prisma.product.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy,
      include: {
        images: true,
        reviews: true,
        seller: { select: { name: true, username: true } },
      },
    });

    const total = await prisma.product.count({ where });

    res.json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (err) {
    console.error("GET ALL PRODUCTS ERROR:", err);
    res.status(500).json({ ERROR: "Failed to fetch products" });
  }
}

/* ----------------------------------------------------------
   GET SINGLE PRODUCT (PUBLIC)
---------------------------------------------------------- */
async function getSingleProduct(req, res) {
  try {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        seller: { select: { id: true, name: true, username: true } },
        reviews: {
          include: { user: { select: { name: true, username: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ ERROR: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err);
    res.status(500).json({ ERROR: "Failed to load product" });
  }
}

/* ----------------------------------------------------------
   DELETE PRODUCT (SELLER or ADMIN)
---------------------------------------------------------- */
async function deleteProduct(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ ERROR: "Product not found" });
    }

    if (product.sellerId !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ ERROR: "Not allowed" });
    }

    await prisma.product.delete({ where: { id: productId } });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ ERROR: "Failed to delete product" });
  }
}

/* ----------------------------------------------------------
   FEATURED PRODUCTS
---------------------------------------------------------- */
async function getFeaturedProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: 10,
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(products);
  } catch (err) {
    console.error("FEATURED ERROR:", err);
    res.status(500).json({ ERROR: "Failed to fetch featured products" });
  }
}

/* ----------------------------------------------------------
   SELLER PRODUCTS
---------------------------------------------------------- */
async function getSellerProducts(req, res) {
  try {
    const { sellerId } = req.params;

    const products = await prisma.product.findMany({
      where: { sellerId },
      include: { images: true, reviews: true },
    });

    res.json(products);
  } catch (err) {
    console.error("SELLER PRODUCTS ERROR:", err);
    res.status(500).json({ ERROR: "Failed to fetch seller products" });
  }
}

/* ----------------------------------------------------------
   TRENDING PRODUCTS
---------------------------------------------------------- */
async function getTrendingProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        reviews: true,
        orderItems: true,
        wishlistItems: true,
      },
    });

    const scored = products.map((p) => {
      const sales = p.orderItems.length;
      const wish = p.wishlistItems.length;

      const avgRating =
        p.reviews.reduce((s, r) => s + r.rating, 0) / (p.reviews.length || 1);

      const ageFactor = Math.max(
        0,
        1 - (Date.now() - new Date(p.createdAt)) / (1000 * 60 * 60 * 24 * 30)
      );

      const score = sales * 3 + wish * 2 + avgRating * 1.5 + ageFactor * 2;

      return { ...p, score };
    });

    const trending = scored.sort((a, b) => b.score - a.score).slice(0, 12);

    res.json(trending);
  } catch (err) {
    console.error("TRENDING ERROR:", err);
    res.status(500).json({ ERROR: "Failed to fetch trending products" });
  }
}

// ---------------- UPDATE PRODUCT ----------------
async function updateProduct(req, res) {
  try {
    const sellerId = req.user.id;
    const { productId } = req.params;
    const { title, description, price, stock, categoryId } = req.body;

    // Find product
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) {
      return res.status(404).json({ ERROR: "Product not found" });
    }

    // Restrict access
    if (product.sellerId !== sellerId && req.user.role !== "ADMIN") {
      return res.status(403).json({ ERROR: "Not allowed" });
    }

    let newImages = [];

    // If user uploaded new images → replace old ones
    if (req.files?.length) {
      const uploaded = await Promise.all(
        req.files.map((file) => uploadToCloud(file.buffer))
      );
      newImages = uploaded;
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        title: title || product.title,
        description: description || product.description,
        price: price ? Number(price) : product.price,
        stock: stock ? Number(stock) : product.stock,
        categoryId: categoryId || product.categoryId,
        ...(newImages.length
          ? {
              images: {
                deleteMany: {}, // remove old
                create: newImages.map((url) => ({ url })), // add new
              },
            }
          : {}),
      },
      include: {
        images: true,
      },
    });

    res.json({
      message: "Product updated successfully",
      product: updated,
    });
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ ERROR: "Failed to update product" });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  getFeaturedProducts,
  getSellerProducts,
  getTrendingProducts,
  updateProduct
};
