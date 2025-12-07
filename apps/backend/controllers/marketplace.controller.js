const { prisma } = require("../config/database");

// GET /api/marketplace/home
async function getMarketplaceHome(req, res) {
  try {
    // Featured products
    const featuredProducts = await prisma.product.findMany({
      where: { featured: true },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        images: true,
        category: true,
        seller: { select: { id: true, name: true } },
      },
    });

    // New arrivals
    const newArrivals = await prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        images: true,
        category: true,
      },
    });

    // Popular categories (by product count)
    const categoryCounts = await prisma.product.groupBy({
      by: ["categoryId"],
      _count: { _all: true },
      orderBy: {
        _count: { _all: "desc" },
      },
      take: 6,
    });

    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: categoryCounts.map((c) => c.categoryId),
        },
      },
    });

    // Attach sample product per category (optional)
    const categoriesWithSample = await Promise.all(
      categories.map(async (cat) => {
        const sampleProduct = await prisma.product.findFirst({
          where: { categoryId: cat.id },
          orderBy: { createdAt: "desc" },
          include: { images: true },
        });

        return {
          ...cat,
          sampleProduct,
        };
      })
    );

    res.json({
      featuredProducts,
      newArrivals,
      categories: categoriesWithSample,
    });
  } catch (err) {
    console.error("MARKETPLACE HOME ERROR:", err);
    res.status(500).json({ ERROR: "Failed to load marketplace data" });
  }
}

module.exports = {
  getMarketplaceHome,
};
