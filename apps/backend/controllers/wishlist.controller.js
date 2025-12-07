const { prisma } = require("../config/database");

/**
 * Ensure the logged-in user has a wishlist row
 */
async function ensureWishlist(userId) {
  let wishlist = await prisma.wishlist.findUnique({
    where: { userId },
  });

  if (!wishlist) {
    wishlist = await prisma.wishlist.create({
      data: { userId },
    });
  }

  return wishlist;
}

/**
 * GET /api/wishlist
 * Get logged-in user's wishlist with products
 */
async function getWishlist(req, res) {
  try {
    const userId = req.user.id;

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                seller: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
    });

    // If no wishlist yet, return empty
    if (!wishlist) {
      return res.json({ items: [] });
    }

    res.json(wishlist);
  } catch (err) {
    console.error("GET WISHLIST ERROR:", err);
    res.status(500).json({ ERROR: "Failed to fetch wishlist" });
  }
}

/**
 * POST /api/wishlist
 * body: { productId }
 */
async function addToWishlist(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ ERROR: "productId is required" });
    }

    const wishlist = await ensureWishlist(userId);

    // prevent duplicates
    const existing = await prisma.wishlistItem.findFirst({
      where: { wishlistId: wishlist.id, productId },
    });

    if (existing) {
      return res.status(400).json({ ERROR: "Already in wishlist" });
    }

    const item = await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    res.status(201).json({
      message: "Added to wishlist",
      item,
    });
  } catch (err) {
    console.error("ADD WISHLIST ERROR:", err);
    res.status(500).json({ ERROR: "Failed to add to wishlist" });
  }
}

/**
 * DELETE /api/wishlist/:itemId
 */
async function removeFromWishlist(req, res) {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const wishlist = await ensureWishlist(userId);

    const item = await prisma.wishlistItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return res.status(404).json({ ERROR: "Wishlist item not found" });
    }

    if (item.wishlistId !== wishlist.id) {
      return res.status(403).json({ ERROR: "Not allowed" });
    }

    await prisma.wishlistItem.delete({
      where: { id: itemId },
    });

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("REMOVE WISHLIST ERROR:", err);
    res.status(500).json({ ERROR: "Failed to remove from wishlist" });
  }
}

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

