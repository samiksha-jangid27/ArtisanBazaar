const { prisma } = require("../config/database");

// ---------------- CREATE ORDER ----------------
async function createOrder(req, res) {
  try {
    const userId = req.user.id;
    const { paymentMethod = "COD" } = req.body; // You can remove payment logic for now

    // Fetch the user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ ERROR: "Your cart is empty" });
    }

    // Validate stock
    for (let item of cart.items) {
      if (item.quantity > item.product.stock) {
        return res.status(400).json({
          ERROR: `Insufficient stock for ${item.product.title}`,
        });
      }
    }

    // Calculate total
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
        paymentStatus: "PAID", // For college project, assume success
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: true },
    });

    // Reduce stock
    for (let item of cart.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: item.product.stock - item.quantity },
      });
    }

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ ERROR: "Failed to create order" });
  }
}

// ---------------- GET USER ORDERS ----------------
async function getMyOrders(req, res) {
  try {
    const userId = req.user.id;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: { include: { images: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    res.status(500).json({ ERROR: "Failed to load orders" });
  }
}

// ---------------- GET SINGLE ORDER ----------------
async function getOrderDetails(req, res) {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: { include: { images: true } } },
        },
        user: { select: { id: true, name: true } },
      },
    });

    if (!order) return res.status(404).json({ ERROR: "Order not found" });

    if (order.userId !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ ERROR: "Not allowed" });
    }

    res.json(order);
  } catch (err) {
    console.error("GET ORDER DETAILS ERROR:", err);
    res.status(500).json({ ERROR: "Failed to fetch order" });
  }
}

// ---------------- ADMIN: GET ALL ORDERS ----------------
async function getAllOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (err) {
    console.error("ADMIN GET ORDERS ERROR:", err);
    res.status(500).json({ ERROR: "Failed to fetch all orders" });
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getAllOrders,
};
