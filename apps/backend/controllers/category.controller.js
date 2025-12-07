const { prisma } = require("../config/database");
const cloudinary = require("../utils/cloudinary");

// Upload helper
async function uploadCategoryImage(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "artisanbazaar/categories" }, (err, res) => {
        if (err) reject(err);
        else resolve(res.secure_url);
      })
      .end(buffer);
  });
}

/* ---------------------------------------------------
   CREATE CATEGORY  (ADMIN)
--------------------------------------------------- */
async function createCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ ERROR: "Name required" });

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadCategoryImage(req.file.buffer);
    }

    const category = await prisma.category.create({
      data: { name, image: imageUrl },
    });

    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (err) {
    console.log("CATEGORY CREATE ERROR:", err);
    res.status(500).json({ ERROR: "Failed to create category" });
  }
}

/* ---------------------------------------------------
   GET ALL CATEGORIES (PUBLIC)
--------------------------------------------------- */
async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ ERROR: "Failed to fetch categories" });
  }
}

/* ---------------------------------------------------
   GET CATEGORY WITH PRODUCTS
--------------------------------------------------- */
async function getCategoryWithProducts(req, res) {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          include: { images: true, seller: true },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ ERROR: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ ERROR: "Failed to fetch category" });
  }
}

/* ---------------------------------------------------
   UPDATE CATEGORY  (ADMIN)
--------------------------------------------------- */
async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let data = {};
    if (name) data.name = name;

    if (req.file) {
      data.image = await uploadCategoryImage(req.file.buffer);
    }

    const updated = await prisma.category.update({
      where: { id },
      data,
    });

    res.json({
      message: "Category updated",
      updated,
    });
  } catch (err) {
    res.status(500).json({ ERROR: "Failed to update category" });
  }
}

/* ---------------------------------------------------
   DELETE CATEGORY  (ADMIN)
--------------------------------------------------- */
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    await prisma.category.delete({ where: { id } });

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ ERROR: "Failed to delete category" });
  }
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryWithProducts,
  updateCategory,
  deleteCategory,
};
