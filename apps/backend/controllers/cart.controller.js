const { prisma } = require("../config/database");

// Auto-create a cart for user if missing
async function ensureCart(userId) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  return cart;
}

// ---------------- GET CART ----------------
async function getCart(req, res) {
  try {
    const userId = req.user.id;

    const cart = await ensureCart(userId);

    const fullCart = await prisma.cart.findUnique({
      where: { id: cart.id },
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

    res.json(fullCart);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ ERROR: "Failed to load cart" });
  }
}

// ---------------- ADD TO CART ----------------
async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ ERROR: "productId is required" });
    }

    const cart = await ensureCart(userId);

    // Check if item exists
    const existing = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existing) {
      // Update quantity
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + Number(quantity) },
      });

      return res.json({
        message: "Cart updated",
        item: updated,
      });
    }

    // Add new item
    const item = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: Number(quantity),
      },
    });

    res.status(201).json({
      message: "Added to cart",
      item,
    });
  } catch (err) {
    console.error("ADD CART ERROR:", err);
    res.status(500).json({ ERROR: "Failed to add to cart" });
  }
}

// ---------------- UPDATE QUANTITY ----------------
async function updateQuantity(req, res) {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ ERROR: "Quantity must be at least 1" });
    }

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!item) return res.status(404).json({ ERROR: "Item not found" });

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: Number(quantity) },
    });

    res.json({
      message: "Quantity updated",
      item: updated,
    });
  } catch (err) {
    console.error("UPDATE QUANTITY ERROR:", err);
    res.status(500).json({ ERROR: "Failed to update item" });
  }
}

// ---------------- REMOVE ITEM ----------------
async function removeItem(req, res) {
  try {
    const { itemId } = req.params;

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!item) return res.status(404).json({ ERROR: "Item not found" });

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("REMOVE ITEM ERROR:", err);
    res.status(500).json({ ERROR: "Failed to remove item" });
  }
}

// ---------------- CLEAR CART ----------------
async function clearCart(req, res) {
  try {
    const userId = req.user.id;

    const cart = await ensureCart(userId);

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("CLEAR CART ERROR:", err);
    res.status(500).json({ ERROR: "Failed to clear cart" });
  }
}

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
};
